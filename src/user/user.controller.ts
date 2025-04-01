import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../auth/staff.gaurd';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  async getAllUsers() {
    return this.userService.getAllCustomers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUserInfo(
    @Param('id') userId: string,
    @Body()
    updateData: Partial<{ name: string; phoneNumber: string; address: string }>,
    @Req() request: any,
  ) {
    const requestUser = request.user;
    return this.userService.updateUserInfo(userId, updateData, requestUser);
  }
}
