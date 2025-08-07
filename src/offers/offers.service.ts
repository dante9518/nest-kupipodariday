import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create(createOfferDto);
    return this.offerRepository.save(offer);
  }

  findAll(where: FindOptionsWhere<Offer>) {
    return this.offerRepository.find({ where });
  }

  findOne(where: FindOptionsWhere<Offer>) {
    return this.offerRepository.findOne({ where });
  }

  updateOne(where: FindOptionsWhere<Offer>, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update(where, updateOfferDto);
  }

  removeOne(where: FindOptionsWhere<Offer>) {
    return this.offerRepository.delete(where);
  }
}
