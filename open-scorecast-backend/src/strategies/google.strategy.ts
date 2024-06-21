import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    let jwt: { access_token: string; };
    const createUserDto: CreateUserDto = {
      username: profile.displayName,
      email: profile.emails[0].value,
      provider: 'Google',
      provider_id: profile.id,
      refresh_token: refreshToken,
      access_token: accessToken,
    };

    const user = await this.authService.validateGoogleUser(createUserDto);

    if (user) {
      jwt = await this.authService.login(user);
    }

    return jwt || null;
  }
}
