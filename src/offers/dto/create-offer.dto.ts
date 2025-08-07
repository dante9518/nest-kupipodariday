import {
  IsBoolean,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOfferDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsBoolean()
  hidden?: boolean;

  @ValidateNested()
  @Type(() => Object)
  user: { id: number };

  @Type(() => Object)
  item: { id: number };
}
