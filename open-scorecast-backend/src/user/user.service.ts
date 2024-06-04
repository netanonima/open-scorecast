import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Fin one user from corresponding email
   * 
   * @param {string} email 
   * @returns {Promise<User>}
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  /**
   * Hashes the provided password using Argon2 hashing.
   * 
   * @param {string} password
   * @returns {Promise<string>}
   */
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  /**
   * Compares the stored password hash with the entered password using Argon2 hashing.
   * 
   * @param {string} storedPasswordHash
   * @param {string} enteredPassword
   * @returns {Promise<boolean>}
   */
  async comparePassword(
    storedPasswordHash: string,
    enteredPassword: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(storedPasswordHash, enteredPassword);
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
