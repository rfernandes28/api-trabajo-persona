import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Sistema para realizar migraciones
//npm run typeorm migration:generate ./src/configuration/database/migrations/prueba

dotenv.config(); //para usar las variables de entorno

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  synchronize: false,
  logging: false,
  entities: [`src/**/*.entity.ts`],
  migrations: [`src/configuration/database/migrations/*.ts`],
  migrationsTableName: 'migrations',
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
