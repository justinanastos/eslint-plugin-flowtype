'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var schema = exports.schema = [{
    type: 'string'
}];

exports.default = function (context) {
    var pattern = new RegExp(context.options[0] || '^Type([A-Z][a-z0-9]+)+$');

    return {
        TypeAlias: function TypeAlias(typeAliasNode) {
            var typeIdentifierName = typeAliasNode.id.name;

            if (!pattern.test(typeIdentifierName)) {
                context.report(typeAliasNode, 'Type identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.', {
                    name: typeIdentifierName,
                    pattern: pattern.toString()
                });
            }
        }
    };
};
//# sourceMappingURL=typeIdMatch.js.map
