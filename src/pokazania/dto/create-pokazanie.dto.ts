export class CreatePokazanieDto {
  uchastokId: number;
  water?: number = 0;
  electricity?: number = 0;
  membership?: number = 0;
  penality?: number = 0;
  target?: number = 0;
  month: number;
  year: number;
  isNewCounter?: boolean = false;

  constructor() {
    this.water = 0;
    this.electricity = 0;
    this.membership = 0;
    this.penality = 0;
    this.target = 0;
  }

  public create(dto: CreatePokazanieDto) {
    if (dto.electricity) this.electricity = dto.electricity;
    if (dto.water) this.water = dto.water;
    if (dto.membership) this.membership = dto.membership;
    if (dto.penality) this.penality = dto.penality;
    if (dto.target) this.target = dto.target;
    this.month = dto.month;
    this.year = dto.year;
  }
}
