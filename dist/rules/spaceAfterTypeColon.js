'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utilities.iterateFunctionNodes)(function (context) {
    var always = (context.options[0] || 'always') === 'always';

    return function (functionNode) {
        (0, _forEach3.default)(functionNode.params, function (identifierNode) {
            var parameterName = (0, _utilities.getParameterName)(identifierNode, context);
            var typeAnnotation = (0, _get3.default)(identifierNode, 'typeAnnotation') || (0, _get3.default)(identifierNode, 'left.typeAnnotation');

            if (typeAnnotation) {
                var spaceAfter = typeAnnotation.typeAnnotation.start - typeAnnotation.start - 1;

                if (always && spaceAfter > 1) {
                    context.report(identifierNode, 'There must be 1 space after "' + parameterName + '" parameter type annotation colon.');
                } else if (always && spaceAfter === 0) {
                    context.report(identifierNode, 'There must be a space after "' + parameterName + '" parameter type annotation colon.');
                } else if (!always && spaceAfter > 0) {
                    context.report(identifierNode, 'There must be no space after "' + parameterName + '" parameter type annotation colon.');
                }
            }
        });

        if (functionNode.returnType) {
            var spaceAfter = functionNode.returnType.typeAnnotation.start - functionNode.returnType.start - 1;

            if (always && spaceAfter > 1) {
                context.report(functionNode, 'There must be 1 space after return type colon.');
            } else if (always && spaceAfter === 0) {
                context.report(functionNode, 'There must be a space after return type colon.');
            } else if (!always && spaceAfter > 0) {
                context.report(functionNode, 'There must be no space after return type colon.');
            }
        }
    };
});
module.exports = exports['default'];
//# sourceMappingURL=spaceAfterTypeColon.js.map
