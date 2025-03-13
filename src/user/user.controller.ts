import { Controller, Get, Param, Patch, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Patch(':id')
  async updateUserInfo(
    @Param('id') userId: string,
    @Body()
    updateData: Partial<{ name: string; phoneNumber: string; address: string }>,
    @Req() request: any,
  ) {
    const requestUser = request.user;
    return this.userService.updateUserInfo(userId, updateData, requestUser);
  }

  @Get(':id/rule-permission')
  async rulePermission(@Param('id') userId: string) {
    return this.userService.rulePermission(userId);
  }
}
