'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isMatch2 = require('lodash/isMatch');

var _isMatch3 = _interopRequireDefault(_isMatch2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context) {
    var checkThisFile = !(0, _get3.default)(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _utilities.isFlowFile)(context);

    if (!checkThisFile) {
        return function () {};
    }

    var annotateReturn = ((0, _get3.default)(context, 'options[0]') || 'always') === 'always';
    var annotateUndefined = ((0, _get3.default)(context, 'options[1].annotateUndefined') || 'never') === 'always';

    var targetNodes = [];

    var registerFunction = function registerFunction(functionNode) {
        targetNodes.push({
            functionNode: functionNode
        });
    };

    var isUndefinedReturnType = function isUndefinedReturnType(returnNode) {
        return returnNode.argument === null || returnNode.argument.name === 'undefined' || returnNode.argument.operator === 'void';
    };

    var getIsReturnTypeAnnotationUndefined = function getIsReturnTypeAnnotationUndefined(targetNode) {
        var isReturnTypeAnnotationLiteralUndefined = (0, _isMatch3.default)(targetNode, {
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
        });

        var isReturnTypeAnnotationVoid = (0, _isMatch3.default)(targetNode, {
            functionNode: {
                returnType: {
                    typeAnnotation: {
                        type: 'VoidTypeAnnotation'
                    }
                }
            }
        });

        return isReturnTypeAnnotationLiteralUndefined || isReturnTypeAnnotationVoid;
    };

    var evaluateFunction = function evaluateFunction(functionNode) {
        var targetNode = targetNodes.pop();

        if (functionNode !== targetNode.functionNode) {
            throw new Error('Mismatch.');
        }

        var isArrowFunctionExpression = functionNode.expression;
        var isFunctionReturnUndefined = !isArrowFunctionExpression && (!targetNode.returnStatementNode || isUndefinedReturnType(targetNode.returnStatementNode));
        var isReturnTypeAnnotationUndefined = getIsReturnTypeAnnotationUndefined(targetNode);

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

    var evaluateNoise = function evaluateNoise() {
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
        ReturnStatement: function ReturnStatement(node) {
            targetNodes[targetNodes.length - 1].returnStatementNode = node;
        }
    };
};

module.exports = exports['default'];
//# sourceMappingURL=requireReturnType.js.map
