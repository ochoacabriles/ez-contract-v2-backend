import { SchemaDirectiveVisitor } from 'apollo-server-express';

class paginationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, args, context) => {
      const [results, count, page, pageSize, aggregations] = await resolve.apply(this, [_, args, context]);
      const pages = Math.ceil(count / pageSize);
      const prev = page > 1 ? page - 1 : null;
      const next = page < pages ? page + 1 : null;
      const result = {
        info: {
          count,
          pages,
          prev,
          next
        },
        results
      };
      if (aggregations) {
        result.aggregations = aggregations;
      }
      return result;
    };
  }
}

export default paginationDirective;
