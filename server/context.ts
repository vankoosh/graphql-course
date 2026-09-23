import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

type Secret = string | Buffer;

const jwtToken = process.env.JWT_TOKEN as Secret;

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string; isAdmin: boolean } | null;
    login: (args: { id: string; isAdmin: boolean }) => Promise<void>;
    logout: () => Promise<void>;
  }
}

const parseToken = (token: string) => {
  const parsedToken = token ? jwt.verify(token, jwtToken) : null;
  if (!parsedToken) return null;

  const payload = z
    .object({
      id: z.string(),
      isAdmin: z.boolean()
    })
    .safeParse(parsedToken);

  return payload.success ? payload.data : null;
};

const prisma = new PrismaClient();

const createContext = async ({ req, res }: { req: Request, res: Response }): Promise<Context> => {
  const token = req.cookies?.token;
  const user = token ? parseToken(token) : null;

  return {
    prisma,
    auth: {
      user,
      login: async (args: { id: string; isAdmin: boolean }) => {
        const token = jwt.sign(args, jwtToken);
        res.cookie('token', token, {
          domain: 'localhost',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true
        });
      },
      logout: async () => {
        res.clearCookie('token');
      }
    }
  }
};

export default createContext;