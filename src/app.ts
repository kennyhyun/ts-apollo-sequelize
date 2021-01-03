import bodyParser from 'body-parser';
import ejs from 'ejs';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import routes from './routers/root';

require('dotenv').config();

export const createApp = (): express.Application => {
  const app: express.Application = express();

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../views')));

  app.set('views', path.join(__dirname, '../views'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  app.use('/', routes);

  return app;
};
