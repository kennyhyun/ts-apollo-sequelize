import models, { ModelType } from './models';

import { AuthenticationError } from 'apollo-server-express';
import { JwtUser } from './types';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'apollo-server';
import { User } from './models/User';
import jwt from 'jsonwebtoken';

import { RECIPIE_TOKEN } from './constants';

const { JWT_SECRET } = process.env;

export interface MyContext {
  setCookie: (any) => Promise<any>;
  getUser: () => Promise<User>;
  verifyUser: () => JwtUser;
  models: ModelType;
  pubsub: PubSub;
  appSecret: string;
}

export interface ExpressContext {
  req: Request;
  res: Response;
  connection?: any;
}

const pubsub = new PubSub();

// eslint-disable-next-line
export const getToken = (req: Express.Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};

export const verifyUser = (token: string): JwtUser => {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
};

export function createContext(ctx: ExpressContext): MyContext {
  const request = ctx.req;
  const response = ctx.res as any;
  const remoteHost = new URL(request['headers'].origin);
  const headerToken = request['cookies'] && request['cookies'][RECIPIE_TOKEN];
  return {
    setCookie: async (obj) =>  {
      const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: remoteHost.hostname,
      };
      Object.keys(obj).map(key => {
        response.cookie(key, obj[key], options);
      });
    },
    getUser: (): Promise<User> => {
      const { User: userModel } = models;
      const token = headerToken || getToken(request);

      if (!token) {
        throw new AuthenticationError('User is not logged in');
      }

      const user = jwt.verify(token, JWT_SECRET) as JwtUser;
      const { userId } = user;

      return userModel.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
    },
    verifyUser: (): JwtUser => {
      const token = headerToken || getToken(request);
      if (!token) {
        return null;
      }

      return jwt.verify(token, JWT_SECRET) as JwtUser;
    },
    models,
    pubsub,
    appSecret: JWT_SECRET,
  };
}
