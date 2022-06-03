/* eslint-disable import/first */
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import express, { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';

import config from './configuration/config';
import container from './configuration/inversify.config';

class Server {
  private app: Application;

  private port: number;

  private server: InversifyExpressServer;

  constructor() {
    this.server = new InversifyExpressServer(container);
    this.port = config.PORT;

    this.middlewares();
    this.app = this.server.build();
  }

  private middlewares() {
    this.server.setConfig((app: Application) => {
      app.use(cors());
      app.use(express.json());
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server running on port: ', this.port);
    });
  }
}

(() => {
  const server = new Server();
  server.listen();
})();
