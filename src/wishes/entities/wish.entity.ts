import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { BaseEntity } from '../../common/base-entity';
import { IsDecimal, IsNumber, IsPositive } from 'class-validator';

@Entity()
export class Wish extends BaseEntity {
  @Column({ length: 250 })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  price: number;

  @Column({ default: 0 })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  raised: number;

  @Column({ length: 1024 })
  description: string;

  @Column({ default: 0 })
  @IsDecimal()
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
