import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Param,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TUser, TUserRequest } from '../common/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { FindUserDto } from './dto/find-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOwn(@Request() { user }: TUserRequest): Promise<TUser> {
    return this.usersService.findOneById(user.id);
  }

  @Patch('me')
  update(
    @Request() { user }: TUserRequest,
    @Body() dto: UpdateUserDto,
  ): Promise<TUser> {
    return this.usersService.update(user.id, dto);
  }

  @Get('me/wishes')
  getOwnWishes(@Request() { user }: TUserRequest): Promise<Wish[]> {
    return this.usersService.getWishes(user.username);
  }

  @Get(':username')
  async getOne(@Param('username') username: string): Promise<TUser> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  @Get(':username/wishes')
  async getWishes(@Param('username') username: string): Promise<Wish[]> {
    return this.usersService.getWishes(username);
  }

  @Post('find')
  async findMany(@Body() dto: FindUserDto): Promise<TUser[]> {
    return this.usersService.find(dto);
  }
}
