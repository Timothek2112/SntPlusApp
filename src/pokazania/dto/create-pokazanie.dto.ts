export class CreatePokazanieDto {
  uchastokId: number;
  water?: number;
  electricity?: number;
  membership?: number = 0;
  penality?: number = 0;
  target?: number = 0;
  month: number;
  year: number;
  isNewCounter?: boolean = false;
  SntId: number;

  toString() {
    return (
      '\n\t water: ' +
      this.water +
      '\n\t' +
      ' electricity: ' +
      this.electricity +
      '\n\t membership: ' +
      this.membership +
      '\n\t target: ' +
      this.target +
      '\n\t penality: ' +
      this.penality +
      '\n\t uchastokId: ' +
      this.uchastokId +
      '\n\t SntId: ' +
      this.SntId +
      '\n\t month: ' +
      this.month +
      '\n\t year: ' +
      this.year
    );
  }

  create(dto: CreatePokazanieDto) {
    if (dto.electricity) this.electricity = dto.electricity;
    if (dto.water) this.water = dto.water;
    if (dto.membership) this.membership = dto.membership;
    if (dto.penality) this.penality = dto.penality;
    if (dto.target) this.target = dto.target;
    this.SntId = dto.SntId;
    this.month = dto.month;
    this.year = dto.year;
  }
}
