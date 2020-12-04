import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './typedefs';
import schemaDirectives from './directives';
import jwt from 'jsonwebtoken';

const playgroundSettings = {
  settings: {
    'editor.theme': 'dark',
    'request.credentials': 'same-origin'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req, res }) => {
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', req.headers.origin);

    // If user is logged, the token will be either in cookies (web) or in headers (mobile)
    let token;
    if (req.cookies) {
      ({ token } = req.cookies);
    } 
    if (!token) {
      ({ token } = req.headers);
    }

    let userId;
    if (token) {
      const secret = res.app.get('jwtSecret');
      ({ id: userId } = jwt.verify(token, secret));
    }

    return { req, res, userId };
  },
  playground: playgroundSettings,
  introspection: true
});

export default server;
