import {
  IsArray, IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @Length(0, 1500)
  description?: string;

  @IsString()
  @IsUrl({}, { message: 'Некорректный URL для обложки' })
  image: string;

  @IsArray()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
