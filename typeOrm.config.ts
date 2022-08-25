import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Pet } from './src/pets/pet.entity';
import { Owner } from './src/owners/entities/owner.entity';
import { join } from 'path';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  database: configService.get('DB_NAME'),
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
