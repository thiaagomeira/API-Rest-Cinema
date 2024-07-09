import { DataSource } from 'typeorm';
import * as path from 'path';

const isCompiled = path.extname(__filename).includes('js');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/database.db',
  synchronize: false,
  logging: false,
  entities: [
    isCompiled
      ? 'build/database/entities/**/*.js'
      : 'src/database/entities/**/*.ts',
  ],
  migrations: [
    isCompiled
      ? 'build/database/migrations/**/*.js'
      : 'src/database/migrations/**/*.ts',
  ],
});
