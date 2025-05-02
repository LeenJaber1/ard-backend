import { Controller, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService , private userService : UserService){}

    @Post('login')
    async login(@Query('email') email : string, @Query('password') password : string,
    @Res({ passthrough: true }) response : Response){
        await this.userService.verifyUser(email , password);
        const {accessToken , refreshToken} = await this.authService.getLoginTokens(email);
        this.authService.createCookie(response ,'refresh_token' , refreshToken , 7 * 24 * 60 * 60 * 1000);
        this.authService.createCookie(response , 'access_token' , accessToken , 60 * 60 * 1000)
        return "logged in successfully";
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    async refresh(@Req() request : Request , @Res({ passthrough: true }) response : Response){
        const userEmail = (request.user as { userEmail: string }).userEmail;
        const {accessToken , refreshToken} = await this.authService.refresh(userEmail);
        this.authService.createCookie(response ,'refresh_token' , refreshToken , 7 * 24 * 60 * 60 * 1000);
        this.authService.createCookie(response , 'access_token' , accessToken , 60 * 60 * 1000)
        return "access and refresh tokens are refreshed";
    }

    @UseGuards(AuthGuard('jwt-access'))
    @Post('logout')
    async logout(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
        const userEmail = (request.user as { userEmail: string }).userEmail;
        await this.authService.logout(userEmail);
        res.clearCookie('access_token', { path: '/' });
        res.clearCookie('refresh_token', { path: '/' });
        return "Logged out";
    }

}
