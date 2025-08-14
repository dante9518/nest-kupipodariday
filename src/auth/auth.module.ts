import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '../configs/jwt.config';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../hash/hash.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtOptions()),
    UsersModule,
    HashModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
