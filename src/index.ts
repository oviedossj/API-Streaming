import { config } from './config';
import { Server } from './express';
import registerResolvers from './resolvers';
import retrieveSchemas from './models/graphql/schemas';

(async () => {
  const resolvers = await registerResolvers();
  const schemas = retrieveSchemas();
  const server = new Server(config.PORT, schemas, resolvers);
  server.start();
})();
