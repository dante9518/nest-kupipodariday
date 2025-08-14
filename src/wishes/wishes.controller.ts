import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { TUserRequest } from '../common/types';
import { Wish } from './entities/wish.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(
    @Request() { user }: TUserRequest,
    @Body() dto: CreateWishDto,
  ): Promise<Wish> {
    return this.wishesService.create(user.id, dto);
  }

  @Get('last')
  findLast(): Promise<Wish[]> {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop(): Promise<Wish[]> {
    return this.wishesService.findTop();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Wish> {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateWishDto): Promise<Wish> {
    return this.wishesService.update(id, dto);
  }

  @Delete(':id')
  removeOne(
    @Param('id') id: number,
    @Request() { user }: TUserRequest,
  ): Promise<Wish> {
    return this.wishesService.removeOne(id, user);
  }

  @Post(':id/copy')
  copy(
    @Param('id') id: number,
    @Request() { user }: TUserRequest,
  ): Promise<Wish> {
    return this.wishesService.copy(id, user);
  }
}
