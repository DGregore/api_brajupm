
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';
import { IntCli, IntCcl, IntCat } from '../entities';
import { AuthModule } from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntCli, IntCcl, IntCat]),
    AuthModule
  ],
  controllers: [ContratosController],
  providers: [ContratosService],
  exports: [ContratosService],
})
export class ContratosModule {}
