import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import * as http from 'http';
import schema from '../server/graphql/schema/index';
import auth from '../server/middlewares/auth';
import config from './index';

class Express {
  public express: express.Application;
  public server: ApolloServer = new ApolloServer(schema);
  public httpServer: http.Server;
  public init = (): void => {
    this.express = express();
    this.express.use(
      cors({
        origin(origin, callback) {
          if (!origin) {
            return callback(null, true);
          }
          if (config.allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not
          allow access from the specified Origin.`;
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        }
      })
    );
    this.express.use(auth);
    this.server.applyMiddleware({ app: this.express });
    this.httpServer = http.createServer(this.express);
    this.server.installSubscriptionHandlers(this.httpServer);
  }
}
export default Express;
