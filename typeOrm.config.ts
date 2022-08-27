import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
config({
  path: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
});
export default new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
