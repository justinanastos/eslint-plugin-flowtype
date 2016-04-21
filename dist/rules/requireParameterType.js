'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utilities.iterateFunctionNodes)(function (context) {
    var checkThisFile = !(0, _get3.default)(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _utilities.isFlowFile)(context);

    if (!checkThisFile) {
        return function () {};
    }

    return function (functionNode) {
        (0, _forEach3.default)(functionNode.params, function (identifierNode) {
            var parameterName = (0, _utilities.getParameterName)(identifierNode, context);
            var typeAnnotation = (0, _get3.default)(identifierNode, 'typeAnnotation') || (0, _get3.default)(identifierNode, 'left.typeAnnotation');

            if (!typeAnnotation) {
                context.report(identifierNode, 'Missing "' + parameterName + '" parameter type annotation.');
            }
        });
    };
});
module.exports = exports['default'];
//# sourceMappingURL=requireParameterType.js.map
