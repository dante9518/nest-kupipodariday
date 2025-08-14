import { IsBoolean, IsNumber, IsPositive } from 'class-validator';

export class CreateOfferDto {
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  amount: number;

  @IsBoolean()
  hidden?: boolean;

  @IsNumber()
  itemId: number;
}
