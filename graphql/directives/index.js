import authDirective from './auth';
import normalizeIdDirective from './normalizeId';
import paginationDirective from './pagination';

const schemaDirectives = {
  auth: authDirective,
  normalizeId: normalizeIdDirective,
  paginate: paginationDirective
};

export default schemaDirectives;
