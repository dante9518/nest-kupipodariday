import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { User } from '../users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { TToken, TUser } from '../common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (!user || !this.hashService.compare(password, user.password))
      return null;

    return user;
  }

  signup(dto: SignUpDto): Promise<TUser> {
    return this.userService.save(dto);
  }

  signin(user: TUser): TToken {
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return {
      access_token: token,
    };
  }
}
