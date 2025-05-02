import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy , 'jwt-access'){
    constructor(private configService : ConfigService) {
        const accessKey = configService.get<string>('JWT_ACCESS_SECRET')!
        super({
            jwtFromRequest: (req: Request) => {
              if (!req.cookies?.access_token) {
                throw new UnauthorizedException();
              }
              return req.cookies.access_token;
            },
            secretOrKey: accessKey,
        });
    }

    validate(payload: any) {
        return { userEmail: payload.sub };
    }

}
