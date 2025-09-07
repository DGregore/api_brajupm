"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteContratosResponseDto = void 0;
const titulo_response_dto_1 = require("./titulo-response.dto");
class ClienteContratosResponseDto {
    cliente;
    titulosAbertos;
    ultimoTituloLiquidado;
    constructor(clienteData, titulosAbertos, ultimoTituloLiquidado) {
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
        this.titulosAbertos = titulosAbertos.map(titulo => new titulo_response_dto_1.TituloResponseDto(titulo));
        this.ultimoTituloLiquidado = ultimoTituloLiquidado.map(titulo => new titulo_response_dto_1.TituloResponseDto(titulo));
    }
}
exports.ClienteContratosResponseDto = ClienteContratosResponseDto;
//# sourceMappingURL=cliente-contratos-response.dto.js.map