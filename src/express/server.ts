import express, { Express } from 'express';
import http from 'http';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { errorLogger, logger as loggerMiddleware } from 'express-winston';
import util from 'util';
import process from 'process';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import logger from '@/utils/logger';

export default class Server {
  private app: Express;

  private apollo: ApolloServer;

  private server: http.Server;

  constructor(
    private readonly port: number,
    private readonly typeDefs: string,
    private readonly resolvers: {
      Query?: object;
      Mutation?: object;
    }[]
  ) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.apollo = new ApolloServer({
      typeDefs: this.typeDefs,
      resolvers: this.resolvers,
      logger,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatError: (errFormated, err: any) => {
        if (errFormated) {
          return {
            message: errFormated.message,
            code: errFormated.extensions?.code || 'INTERNAL_SERVER_ERROR',
            status: errFormated.extensions?.status || 500,
          };
        }
        return {
          message: err?.message || err,
          code: err?.code || 'INTERNAL_SERVER_ERROR',
          status: err?.status || 500,
        };
      },
    });
    this.setServerConfig();
    this.setListeners();
  }

  start(): void {
    this.server.listen(this.port, () => {
      logger.info(`⚡ Listening on ${this.port}`);
    });
  }

  async setServerConfig(): Promise<void> {
    this.app.set('port', this.port);
    this.app.set('trust proxy', 1);
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // Use logging
    this.app.use(
      loggerMiddleware({
        winstonInstance: logger,
        expressFormat: true,
        colorize: true,
        meta: false,
      })
    );
    await this.apollo.start();
    // Configure route
    this.app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
    );
    this.app.use(
      errorLogger({
        winstonInstance: logger,
      })
    );
  }

  stop(): void {
    logger.info(`Stopping server. Waiting for connections to end...`);
    this.server.close(() => {
      logger.info(`Server closed successfully`);
    });
  }

  setListeners(): void {
    process.on('uncaughtExceptionMonitor', (error: Error, origin: string) => {
      logger.error(`Caught exception:\n${util.format(error)}`);
      logger.error(`Origin: ${origin}`);
    });
    process.on('unhandledRejection', (reason, promise) => {
      logger.warn(`Unhandled Rejection at:\n${util.format(promise)}`);
    });
  }
}
