import _ from 'lodash';
import {
    isFlowFile
} from './../utilities';

export default (context) => {
    const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

    if (!checkThisFile) {
        return () => {};
    }

    const annotateReturn = (_.get(context, 'options[0]') || 'always') === 'always';
    const annotateUndefined = (_.get(context, 'options[1].annotateUndefined') || 'never') === 'always';

    const targetNodes = [];

    const registerFunction = (functionNode) => {
        targetNodes.push({
            functionNode
        });
    };

    const isUndefinedReturnType = (returnNode) => {
        return returnNode.argument === null || returnNode.argument.name === 'undefined' || returnNode.argument.operator === 'void';
    };

    const getIsReturnTypeAnnotationUndefined = (targetNode) => {
        const isReturnTypeAnnotationLiteralUndefined = _.isMatch(
            targetNode,
            {
                functionNode: {
                    returnType: {
                        typeAnnotation: {
                            id: {
                                name: 'undefined'
                            },
                            type: 'GenericTypeAnnotation'
                        }
                    }
                }
            }
        );

        const isReturnTypeAnnotationVoid = _.isMatch(
            targetNode,
            {
                functionNode: {
                    returnType: {
                        typeAnnotation: {
                            type: 'VoidTypeAnnotation'
                        }
                    }
                }
            }
        );

        return isReturnTypeAnnotationLiteralUndefined || isReturnTypeAnnotationVoid;
    };

    const evaluateFunction = (functionNode) => {
        const targetNode = targetNodes.pop();

        if (functionNode !== targetNode.functionNode) {
            throw new Error('Mismatch.');
        }

        const isArrowFunctionExpression = functionNode.expression;
        const isFunctionReturnUndefined = !isArrowFunctionExpression && (!targetNode.returnStatementNode || isUndefinedReturnType(targetNode.returnStatementNode));
        const isReturnTypeAnnotationUndefined = getIsReturnTypeAnnotationUndefined(targetNode);

        if (isFunctionReturnUndefined && isReturnTypeAnnotationUndefined && !annotateUndefined) {
            context.report(functionNode, 'Must not annotate undefined return type.');
        } else if (isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateUndefined) {
            context.report(functionNode, 'Must annotate undefined return type.');
        } else if (!isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined) {
            if (annotateReturn && !functionNode.returnType) {
                context.report(functionNode, 'Missing return type annotation.');
            }
        }
    };

    const evaluateNoise = () => {
        targetNodes.pop();
    };

    return {
        ArrowFunctionExpression: registerFunction,
        'ArrowFunctionExpression:exit': evaluateFunction,
        ClassDeclaration: registerFunction,
        'ClassDeclaration:exit': evaluateNoise,
        ClassExpression: registerFunction,
        'ClassExpression:exit': evaluateNoise,
        FunctionDeclaration: registerFunction,
        'FunctionDeclaration:exit': evaluateFunction,
        FunctionExpression: registerFunction,
        'FunctionExpression:exit': evaluateFunction,
        ReturnStatement: (node) => {
            targetNodes[targetNodes.length - 1].returnStatementNode = node;
        }
    };
};
