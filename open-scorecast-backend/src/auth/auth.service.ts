import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuthProvider } from 'src/entities/oauth-provider.entity';
import { UserOAuth } from 'src/entities/user-oauth.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  // Todo: implement user logic
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OAuthProvider)
    private readonly oauthProviderRepository: Repository<OAuthProvider>,
    @InjectRepository(UserOAuth)
    private readonly userOAuthRepository: Repository<UserOAuth>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && argon2.verify(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOrCreateUser(oauthId: string, providerName: string, accessToken: string, refreshToken: string, expiresAt: Date) {
    const provider = await this.oauthProviderRepository.findOne({ where: { name: providerName } });

    let userOAuth = await this.userOAuthRepository.findOne({ where: { oauthId, oauthProvider: provider } });

    if (!userOAuth) {
      const user = this.userRepository.create();
      await this.userRepository.save(user);

      userOAuth = this.userOAuthRepository.create({
        user,
        oauthProvider: provider,
        oauthId,
        accessToken,
        refreshToken,
        expiresAt,
      });

      await this.userOAuthRepository.save(userOAuth);
    } else {
      userOAuth.accessToken = accessToken;
      userOAuth.refreshToken = refreshToken;
      userOAuth.expiresAt = expiresAt;
      await this.userOAuthRepository.save(userOAuth);
    }

    return userOAuth.user;
  }
}
