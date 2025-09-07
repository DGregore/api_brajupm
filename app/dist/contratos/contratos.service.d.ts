import { Repository } from 'typeorm';
import { IntCli, IntCcl, IntCat } from '../entities';
import { ClienteContratosResponseDto } from '../dto';
export declare class ContratosService {
    private readonly cliRepository;
    private readonly cclRepository;
    private readonly catRepository;
    constructor(cliRepository: Repository<IntCli>, cclRepository: Repository<IntCcl>, catRepository: Repository<IntCat>);
    private padCpf;
    buscarPorCpf(cpf: string): Promise<ClienteContratosResponseDto>;
    buscarPorCelular(celular: string): Promise<ClienteContratosResponseDto>;
}
