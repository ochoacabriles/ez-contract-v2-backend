import { SchemaDirectiveVisitor } from 'apollo-server-express';

class authDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, args, ctx) => {
      const { userId } = ctx;
      if (userId) {
        return resolve.apply(this, [_, args, ctx]);
      }
      throw new Error('unathenticated');
    };
  }
}

export default authDirective;
