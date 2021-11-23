import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import envConfig from './env-config';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: envConfig.db.host,
  port: envConfig.db.port,
  username: envConfig.db.username,
  password: envConfig.db.password,
  database: envConfig.db.database,
  dropSchema: envConfig.db.dbDrop === 'true',
  synchronize: envConfig.db.dbSync === 'true',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  namingStrategy: new SnakeNamingStrategy(),
  logging: envConfig.env === 'local',
  logger: 'file',
};
