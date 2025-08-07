export class CreateOfferDto {
  amount: number;
  hidden?: boolean;
  user: { id: number };
  item: { id: number };
}
