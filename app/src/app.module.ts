
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContratosModule } from './contratos/contratos.module';
import { IntCli, IntCcl, IntCat } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST', 'localhost'),
        port: parseInt(configService.get('DB_PORT', '1433')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE', 'Contratos'),
        entities: [IntCli, IntCcl, IntCat],
        synchronize: false, // NUNCA true em produção com banco existente
        logging: configService.get('DB_LOGGING', 'false') === 'true',
        options: {
          encrypt: configService.get('DB_ENCRYPT', 'false') === 'true',
          trustServerCertificate: configService.get('DB_TRUST_CERT', 'true') === 'true',
          enableArithAbort: true,
          instanceName: '',
        },
        extra: {
          validateParameters: false,
          abortTransactionOnError: false,
        },
        connectionTimeout: 30000,
        requestTimeout: 30000,
      }),
      inject: [ConfigService],
    }),
    ContratosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
