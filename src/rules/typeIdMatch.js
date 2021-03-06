export const schema = [
    {
        type: 'string'
    }
];

export default (context) => {
    const pattern = new RegExp(context.options[0] || '^Type([A-Z][a-z0-9]+)+$');

    return {
        TypeAlias (typeAliasNode) {
            const typeIdentifierName = typeAliasNode.id.name;

            if (!pattern.test(typeIdentifierName)) {
                context.report(typeAliasNode, 'Type identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.', {
                    name: typeIdentifierName,
                    pattern: pattern.toString()
                });
            }
        }
    };
};
