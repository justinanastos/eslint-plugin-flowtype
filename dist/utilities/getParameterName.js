'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (identifierNode, context) {
    if ((0, _has3.default)(identifierNode, 'name')) {
        return identifierNode.name;
    }

    if ((0, _has3.default)(identifierNode, 'left.name')) {
        return identifierNode.left.name;
    }

    if (identifierNode.type === 'RestElement') {
        return identifierNode.argument.name;
    }

    if (identifierNode.type === 'ObjectPattern' || identifierNode.type === 'ArrayPattern') {
        return context.getSourceCode().getText(identifierNode);
    }
    if ((0, _get3.default)(identifierNode, 'left.type') === 'ObjectPattern' && (0, _get3.default)(identifierNode, 'right.type') === 'ObjectExpression') {
        return context.getSourceCode().getText(identifierNode.left);
    }

    throw new Error('Unsupported function signature.');
};

module.exports = exports['default'];
//# sourceMappingURL=getParameterName.js.map
