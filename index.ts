import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config';
import Express from './config/express';

Promise.promisifyAll(mongoose);

mongoose.connect(config.db, {
  bufferMaxEntries: 0,
  keepAlive: true,
  reconnectInterval: 500,
  reconnectTries: 30,
  socketTimeoutMS: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on('open', () => {
  console.log(`connected to database: ${config.db}`);
});

const ExpressServer = new Express();
ExpressServer.init();

ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
  console.log(`?  Server ready at ${config.port}`);
  console.log(
    `? Server ready at http://localhost:${config.port}${ExpressServer.server.graphqlPath}`
  );
  console.log(
    `? Subscriptions ready at ws://localhost:${config.port}${ExpressServer.server.subscriptionsPath}`
  );
});
