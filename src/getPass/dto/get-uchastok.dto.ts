export class getUchastokDto {
  uchastokId: number;
  SntId: number;

  constructor(uchastokId: number, SntId: number) {
    this.SntId = SntId;
    this.uchastokId = uchastokId;
  }
}
