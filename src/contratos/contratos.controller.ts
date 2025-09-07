
import { 
  Controller, 
  Get, 
  Param, 
  HttpException, 
  HttpStatus,
  ValidationPipe,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ClienteContratosResponseDto } from '../dto';
import { AuthGuard } from '../auth';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Get('cpf/:cpf')
  @UseGuards(AuthGuard)
  async buscarPorCpf(@Param('cpf') cpf: string): Promise<ClienteContratosResponseDto> {
    try {
      // Validar se o CPF contém apenas números (aceita entre 11 e 15 dígitos)
      if (!/^\d{11,15}$/.test(cpf)) {
        throw new HttpException(
          'CPF deve conter entre 11 e 15 dígitos numéricos',
          HttpStatus.BAD_REQUEST
        );
      }

      return await this.contratosService.buscarPorCpf(cpf);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('celular/:celular')
  @UseGuards(AuthGuard)
  async buscarPorCelular(@Param('celular') celular: string): Promise<ClienteContratosResponseDto> {
    try {
      // Validar se o celular contém apenas números
      if (!/^\d+$/.test(celular)) {
        throw new HttpException(
          'Celular deve conter apenas dígitos numéricos',
          HttpStatus.BAD_REQUEST
        );
      }

      // Validar tamanho mínimo e máximo
      if (celular.length < 10 || celular.length > 15) {
        throw new HttpException(
          'Celular deve ter entre 10 e 15 dígitos',
          HttpStatus.BAD_REQUEST
        );
      }

      return await this.contratosService.buscarPorCelular(celular);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
