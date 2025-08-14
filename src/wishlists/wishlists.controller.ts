import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { TUserRequest } from '../common/types';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistService) {}

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Post()
  create(
    @Body() dto: CreateWishlistDto,
    @Req() { user }: TUserRequest,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(dto, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Wishlist> {
    return this.wishlistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateWishlistDto,
    @Req() { user }: TUserRequest,
  ): Promise<Wishlist> {
    return this.wishlistsService.update(id, dto, user.id);
  }

  @Delete(':id')
  removeOne(
    @Param('id') id: number,
    @Req() { user }: TUserRequest,
  ): Promise<Wishlist> {
    return this.wishlistsService.removeOne(id, user.id);
  }
}
