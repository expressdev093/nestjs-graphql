import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';
config({
  path: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  database: 'devdb',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
