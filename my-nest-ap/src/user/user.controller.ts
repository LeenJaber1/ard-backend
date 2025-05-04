import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() createUserDTO: CreateUserDto) {
    return this.userService.createUser(createUserDTO);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('update-location')
  updateLocation(@Body() updateUserDTO: UpdateUserDto) {
    return this.userService.updateLocation(updateUserDTO);
  }
  @Get('location')
  getLocation(@Query('email') email: string) {
    return this.userService.getUserLocation(email);
  }
}
