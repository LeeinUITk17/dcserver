import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './models/item.model';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  createItem(@Args('data') data: CreateItemInput) {
    return this.itemService.create(data);
  }

  @Mutation(() => Item)
  updateItem(@Args('data') data: UpdateItemInput) {
    return this.itemService.update(data.id, data);
  }

  @Mutation(() => Item)
  deleteItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.remove(id);
  }
}
