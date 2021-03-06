"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (iterator) {
    return function (context) {
        var nodeIterator = iterator(context);

        return {
            ArrowFunctionExpression: nodeIterator,
            FunctionDeclaration: nodeIterator,
            FunctionExpression: nodeIterator
        };
    };
};

module.exports = exports['default'];
//# sourceMappingURL=iterateFunctionNodes.js.map
