import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { prisma } from '../index';
import { CreateUserType } from '../types';

@ObjectType()
export class Post {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  body: string;
  @Field()
  published: boolean;
  @Field()
  authorId: number;
}

@ObjectType()
class UserType {
  @Field()
  id: number;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => [Post])
  posts: Post[];
}

Resolver();
export class UserResolver {
  @Query(() => [UserType])
  async allUser() {
    return await prisma.user.findMany({ include: { posts: true } });
  }
  @Mutation(() => UserType)
  async createUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<CreateUserType | void> {
    try {
      const user = await prisma.user.create({ data: { email, password } });

      return user;
    } catch (error) {
      console.log(error);
    }
  }
  @Mutation(() => UserType)
  async loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<CreateUserType | void | Object> {
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { email } });
      if (!user) {
        return { msg: 'user tida adak' };
      }
      const isValidPassword = user.password === password;
      if (!isValidPassword) return { msg: 'password tida adak' };

      return user;
    } catch (error) {
      return error.message;
    }
  }
}
