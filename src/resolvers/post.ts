import { isAuth } from '../middleware/isAuth';
import { MyContext, PostTypePrisma } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { prisma } from '../index';

declare module 'express-session' {
  interface SessionData {
    userId?: number | any;
  }
}

@ObjectType()
class PostType {
  @Field()
  title: string;
  @Field()
  body: string;
  @Field()
  authorId: number;
  @Field()
  id: number;
}

Resolver();
export class PostResolver {
  @Mutation(() => PostType)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('authorId') authorId: number
  ): Promise<PostTypePrisma | void> {
    try {
      const post = await prisma.post.create({
        data: { title, body, authorId: Number(authorId) },
      });

      return post;
    } catch (error) {
      console.log(error);
    }
  }
}
