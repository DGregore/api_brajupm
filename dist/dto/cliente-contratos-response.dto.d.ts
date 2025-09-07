import { TituloResponseDto } from './titulo-response.dto';
export declare class ClienteContratosResponseDto {
    cliente: {
        codEmp: string;
        cicCli: string;
        nomCli: string;
        endCli: string;
        baiCli: string;
        cidCli: string;
        estCli: string;
        cepCli: string;
        numMat: string;
        datNas: Date;
        celCli: string;
        emaCli: string;
    };
    titulosAbertos: TituloResponseDto[];
    ultimoTituloLiquidado: TituloResponseDto[];
    constructor(clienteData: any, titulosAbertos: any[], ultimoTituloLiquidado: any[]);
}
