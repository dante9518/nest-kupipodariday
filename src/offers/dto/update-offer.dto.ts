import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsNumber()
  itemId: number;
}
