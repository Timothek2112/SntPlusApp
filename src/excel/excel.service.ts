/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workbook } from 'exceljs';
import { User } from 'src/getPass/models/user.model';
import { Payment } from 'src/pokazania/models/payments.model';
import { Pokazania } from 'src/pokazania/models/pokazania.model';
import { PeriodDto } from './dto/period.dto';

@Injectable()
export class ExcelService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async calculateForPeriod(dto: PeriodDto) {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });

    let workbook = new Workbook();
    const fileName = 'maket.xlsx';
    workbook = await workbook.xlsx.readFile(fileName);
    const worksheet = workbook.getWorksheet('20' + dto.year);

    for (let g = 0; g < users.length; g++) {
      const user = await this.userRepository.findOne({
        where: { id: users[g].id },
        include: { all: true },
      });
      if (user.pokazania.length > 0 && user.payments.length > 0) {
        const pokazaniaUser = user.pokazania;
        const paymentsUser = user.payments;

        for (let i = 0; i < pokazaniaUser.length; i++) {
          if (
            pokazaniaUser[i].month >= dto.startPeriodM &&
            pokazaniaUser[i].month <= dto.endPeriodM
          ) {
            if (user.uchastok == 1) {
              const electricityRow = worksheet.getRow(8);

              electricityRow.getCell(9).value = pokazaniaUser[i].electricity;
              electricityRow.getCell(12).value = paymentsUser[i].electricity;
            } else {
              const electricityRow = worksheet.getRow(9 * user.uchastok);
              const waterRow = worksheet.getRow(electricityRow.number + 1);

              electricityRow.getCell(5 + 4 * pokazaniaUser[i].month).value =
                pokazaniaUser[i].electricity;
              electricityRow.getCell(8 + 4 * pokazaniaUser[i].month).value =
                this.findByYearMonth(
                  paymentsUser,
                  dto.year,
                  pokazaniaUser[i].month,
                ).electricity;
              waterRow.getCell(5 + 4 * pokazaniaUser[i].month).value =
                pokazaniaUser[i].water;
              waterRow.getCell(8 + 4 * pokazaniaUser[i].month).value =
                this.findByYearMonth(
                  paymentsUser,
                  dto.year,
                  pokazaniaUser[i].month,
                ).water;
              electricityRow.commit();
              waterRow.commit();
            }
          }
        }
      }
      await workbook.xlsx.writeFile('maket.xlsx');
    }
  }

  findByYearMonth(payments: Payment[], year: number, month: number) {
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].month == month && payments[i].year == year) {
        return payments[i];
      }
    }
  }
}
