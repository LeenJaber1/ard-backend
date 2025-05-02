import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy , 'jwt-refresh'){
    constructor(private configService : ConfigService) {
        const refreshKey = configService.get<string>('JWT_REFRESH_SECRET')!
        super({
            jwtFromRequest: (req: Request) => {
            if (!req.cookies?.refresh_token) throw new UnauthorizedException();
                return req.cookies.refresh_token;
            },
            secretOrKey: refreshKey,
        });
    }
    
    
    validate(payload: any) {
        return { userEmail: payload.sub };
    }
}
