import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// locals
import { jsonConfig } from '../common/helper/config.helper';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const Database: object = jsonConfig(
      this.config.get<string>('NODE_ENV'),
      this.config.get<string>('DATABASE'),
    );

    const typeOrmModuleOptions: TypeOrmModuleOptions &
      DataSourceOptions &
      SeederOptions = {
      type: Database['type'], // it can be <postgres> or <mssql>
      host: Database['host'],
      port: +Database['port'],
      database: Database['name'],
      username: Database['username'],
      password: Database['password'],
      entities: ['dist/**/*.{entity,view}.{ts,js}'],
      subscribers: ['dist/**/*.subscriber.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never TRUE this in production!
      extra: {
        trustServerCertificate: true,
      },
      // seeds and factories
      seeds: ['dist/**/*{.ts,.js}'],
      factories: ['dist/**/*{.ts,.js}'],
    };

    const seeding = this.config.get<string>('SEED') === 'true';

    if (seeding) {
      console.log('Database seeding...');

      const AppDataSource = new DataSource(
        typeOrmModuleOptions as SqlServerConnectionOptions,
      );

      (async () => {
        await AppDataSource.initialize();
        await AppDataSource.dropDatabase();
        await AppDataSource.destroy();
      })();

      setTimeout(async () => {
        await AppDataSource.initialize();
        runSeeders(AppDataSource, {
          seeds: ['dist/**/*.seeder{.ts,.js}'],
          factories: ['dist/**/*.factory{.ts,.js}'],
        });
      }, 5000);
    }

    return typeOrmModuleOptions;
  }
}
