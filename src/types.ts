import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

export type MyContext = {
  req: Request;
  res: Response;
};

export interface MutationType {
  name: string;
  age: number;
  email: string;
}

export type CreateUserType = Prisma.UserGetPayload<{}>;
export type PostTypePrisma = Prisma.PostGetPayload<{}>;
