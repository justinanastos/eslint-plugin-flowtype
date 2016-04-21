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
    var always = context.options[0] === 'always';

    return function (functionNode) {
        (0, _forEach3.default)(functionNode.params, function (identifierNode) {
            var parameterName = (0, _utilities.getParameterName)(identifierNode, context);
            var typeAnnotation = (0, _get3.default)(identifierNode, 'typeAnnotation') || (0, _get3.default)(identifierNode, 'left.typeAnnotation');

            if (typeAnnotation) {
                var spaceBefore = typeAnnotation.start - identifierNode.end;

                if (always && spaceBefore > 1) {
                    context.report(identifierNode, 'There must be 1 space before "' + parameterName + '" parameter type annotation colon.');
                } else if (always && spaceBefore === 0) {
                    context.report(identifierNode, 'There must be a space before "' + parameterName + '" parameter type annotation colon.');
                } else if (!always && spaceBefore > 0) {
                    context.report(identifierNode, 'There must be no space before "' + parameterName + '" parameter type annotation colon.');
                }
            }
        });
    };
});
module.exports = exports['default'];
//# sourceMappingURL=spaceBeforeTypeColon.js.map
