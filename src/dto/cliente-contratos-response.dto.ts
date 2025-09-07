

import { TituloResponseDto } from './titulo-response.dto';

export class ClienteContratosResponseDto {
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

  constructor(clienteData: any, titulosAbertos: any[], ultimoTituloLiquidado: any[]) {
    this.cliente = {
      codEmp: clienteData.Cli_CodEmp,
      cicCli: clienteData.Cli_CicCli,
      nomCli: clienteData.Cli_NomCli,
      endCli: clienteData.Cli_EndCli,
      baiCli: clienteData.Cli_BaiCli,
      cidCli: clienteData.Cli_CidCli,
      estCli: clienteData.Cli_EstCli,
      cepCli: clienteData.Cli_CepCli,
      numMat: clienteData.Cli_NumMat,
      datNas: clienteData.Cli_DatNas,
      celCli: clienteData.Cli_CelCli,
      emaCli: clienteData.Cli_EmaCli,
    };
    this.titulosAbertos = titulosAbertos.map(titulo => new TituloResponseDto(titulo));
    this.ultimoTituloLiquidado = ultimoTituloLiquidado.map(titulo => new TituloResponseDto(titulo));
  }
}

