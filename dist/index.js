'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requireParameterType = require('./rules/requireParameterType');

var _requireParameterType2 = _interopRequireDefault(_requireParameterType);

var _requireReturnType = require('./rules/requireReturnType');

var _requireReturnType2 = _interopRequireDefault(_requireReturnType);

var _spaceAfterTypeColon = require('./rules/spaceAfterTypeColon');

var _spaceAfterTypeColon2 = _interopRequireDefault(_spaceAfterTypeColon);

var _spaceBeforeTypeColon = require('./rules/spaceBeforeTypeColon');

var _spaceBeforeTypeColon2 = _interopRequireDefault(_spaceBeforeTypeColon);

var _typeIdMatch = require('./rules/typeIdMatch');

var _typeIdMatch2 = _interopRequireDefault(_typeIdMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    rules: {
        'require-parameter-type': _requireParameterType2.default,
        'require-return-type': _requireReturnType2.default,
        'space-after-type-colon': _spaceAfterTypeColon2.default,
        'space-before-type-colon': _spaceBeforeTypeColon2.default,
        'type-id-match': _typeIdMatch2.default
    },
    rulesConfig: {
        'require-parameter-type': 0,
        'require-return-type': 0,
        'space-after-type-colon': 0,
        'space-before-type-colon': 0,
        'type-id-match': 0
    }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
