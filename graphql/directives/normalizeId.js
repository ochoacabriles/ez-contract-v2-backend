import { SchemaDirectiveVisitor } from 'apollo-server-express';
import normalizeId from 'normalize-mongo-id';

class normalizeIdDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, args, context) => {
      const rawResults = await resolve.apply(this, [_, args, context]);
      const results = rawResults.map(rawResult =>
        rawResult.id ? rawResult : normalizeId(rawResult)
      );
      return results;
    };
  }
}

export default normalizeIdDirective;
