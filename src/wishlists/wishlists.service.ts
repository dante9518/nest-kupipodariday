import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from '../wishes/wishes.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateWishlistDto, userId: number): Promise<Wishlist> {
    const user = await this.usersService.findOneById(userId);
    const wishes = await this.wishesService.findMany(dto.itemsId);

    return this.wishlistRepository.save({
      ...dto,
      owner: user,
      items: wishes,
    });
  }

  findAll() {
    return this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });
  }

  async findOne(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (!wishlist) {
      throw new NotFoundException(`Wishlist с id=${id} не найден`);
    }
    return wishlist;
  }

  async update(
    id: number,
    dto: UpdateWishlistDto,
    userId: number,
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(id);

    if (dto.name !== undefined) wishlist.name = dto.name;
    if (dto.description !== undefined) wishlist.description = dto.description;
    if (dto.image !== undefined) wishlist.image = dto.image;

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Вы не можете изменить чужой список желаний',
      );
    }
    if (dto.itemsId) {
      const { itemsId, ...rest } = dto;
      const wishes = await this.wishesService.findMany(itemsId);
      wishlist.items.push(...wishes);
      await this.wishlistRepository.save(wishlist);
      await this.wishlistRepository.update(id, rest);
    } else {
      await this.wishlistRepository.update(id, dto);
    }

    return wishlist;
  }

  async removeOne(id: number, userId: number): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Вы не можете удалить чужой список желаний',
      );
    }
    await this.wishlistRepository.delete(wishlist);
    return wishlist;
  }
}
