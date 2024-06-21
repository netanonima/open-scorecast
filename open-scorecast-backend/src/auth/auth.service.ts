import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user && await this.userService.comparePassword(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: any) {
    const payload = { username: user.username, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);

    if (user) return user;
    console.log('User not found. Creating...');

    return await this.userService.create(createUserDto);
  }
}
