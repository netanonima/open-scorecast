import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { UserOAuth } from 'src/entities/user-oauth.entity';
import { OAuthProvider } from 'src/entities/oauth-provider.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, OAuthProvider, UserOAuth]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
