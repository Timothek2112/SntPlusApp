/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import winston from 'winston';

@Injectable()
export class LoggerService {
  constructor(
    private logger = winston.createLogger({
      level: 'info',
      format: winston.format.simple(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
      ],
    }),
  ) {
    logger.info('Логгер инициализирован');
  }

  log(message: string) {
    this.logger.info(message);
  }
}
