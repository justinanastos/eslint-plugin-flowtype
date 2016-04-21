'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context) {
    var comments = context.getAllComments();

    if (!comments.length) {
        return false;
    }

    var firstComment = comments[0];

    return (0, _includes3.default)(firstComment.value, '@flow');
};

module.exports = exports['default'];
//# sourceMappingURL=isFlowFile.js.map
