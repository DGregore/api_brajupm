import { ContratosService } from './contratos.service';
import { ClienteContratosResponseDto } from '../dto';
export declare class ContratosController {
    private readonly contratosService;
    constructor(contratosService: ContratosService);
    buscarPorCpf(cpf: string): Promise<ClienteContratosResponseDto>;
    buscarPorCelular(celular: string): Promise<ClienteContratosResponseDto>;
}
