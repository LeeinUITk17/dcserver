import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  createdAt: Date;
}
