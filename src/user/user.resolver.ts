import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { AdminGuard } from 'src/auth/admin.gaurd';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Query(() => [User], { name: 'getAllUsers' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'getUserById' })
  async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, { name: 'updateUserInfo' })
  async updateUserInfo(
    @Args('id') id: string,
    @Args('updateData') updateData: UpdateUserInput,
    @Context('req') context: any,
  ) {
    const requestUser = context.user;
    return this.userService.updateUserInfo(id, updateData, requestUser);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Query(() => Boolean, { name: 'checkAdminPermission' })
  async checkAdminPermission(@Context('req') context: any) {
    const requestUser = context.user;
    return this.userService.rulePermission(requestUser.id);
  }
}
