import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { UpdateWishDto } from '../wishes/dto/update-wish.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  async create(dto: CreateOfferDto, userId: number): Promise<Offer> {
    const user = await this.usersService.findOneById(userId);
    const wish = await this.wishesService.findOne(dto.itemId);

    const donation = Number(wish.raised) + dto.amount;

    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'You cannot contribute money to your own gifts',
      );
    }

    if (donation > wish.price) {
      throw new BadRequestException(
        'The amount of the donation exceeds the price of the gift',
      );
    }

    await this.wishesService.update(dto.itemId, {
      raised: donation,
    } as UpdateWishDto);

    return this.offerRepository.save({ ...dto, user, item: wish });
  }

  async findAll(): Promise<Offer[]> {
    const offers = await this.offerRepository.find({
      relations: ['user', 'item'],
    });

    offers.forEach((offer) => delete offer.user.password);
    return offers;
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOneOrFail({ where: { id } });
  }
}
