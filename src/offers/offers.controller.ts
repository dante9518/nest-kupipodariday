import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { TUserRequest } from '../common/types';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() dto: CreateOfferDto,
    @Request() { user }: TUserRequest,
  ): Promise<Offer> {
    return this.offersService.create(dto, user.id);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Offer> {
    return this.offersService.findOne(id);
  }
}
