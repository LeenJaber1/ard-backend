import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService){}

    @Post('signup')
    signUp(@Body() createUserDTO : CreateUserDto){
        return this.userService.createUser(createUserDTO);
    }

    @Put('update-location')
    updateLocation(@Body() updateUserDTO : UpdateUserDto){
        return this.userService.updateLocation(updateUserDTO);
    }
}
