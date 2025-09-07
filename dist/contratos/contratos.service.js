"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const dto_1 = require("../dto");
let ContratosService = class ContratosService {
    cliRepository;
    cclRepository;
    catRepository;
    constructor(cliRepository, cclRepository, catRepository) {
        this.cliRepository = cliRepository;
        this.cclRepository = cclRepository;
        this.catRepository = catRepository;
    }
    padCpf(cpf) {
        const cleanCpf = cpf.toString().trim();
        return cleanCpf.padStart(14, '0');
    }
    async buscarPorCpf(cpf) {
        const cpfFormatado = this.padCpf(cpf);
        try {
            const clienteQuery = `
        SELECT DISTINCT
          cli.Cli_CodEmp,
          cli.Cli_CicCli,
          cli.Cli_NomCli,
          cli.Cli_EndCli,
          cli.Cli_BaiCli,
          cli.Cli_CidCli,
          cli.Cli_EstCli,
          cli.Cli_CepCli,
          cli.Cli_NumMat,
          cli.Cli_DatNas,
          cli.Cli_CelCli,
          cli.Cli_EmaCli
        FROM IntCli cli
        INNER JOIN IntCcl ccl ON cli.Cli_CodEmp = ccl.Ccl_CodEmp 
          AND LTRIM(RTRIM(cli.Cli_CicCli)) = LTRIM(RTRIM(ccl.Ccl_CicCli))
        WHERE LTRIM(RTRIM(cli.Cli_CicCli)) = @0
          AND ccl.Ccl_SitCcl = 'A'
          AND ccl.Ccl_CodFil IN ('03', '04', '05', '07', '09', '12', '14', '21', '25', '26', '90')
      `;
            const clienteResult = await this.cliRepository.query(clienteQuery, [cpfFormatado]);
            if (!clienteResult || clienteResult.length === 0) {
                throw new common_1.NotFoundException('Cliente não encontrado');
            }
            const clienteData = clienteResult[0];
            const titulosAbertosQuery = `
        SELECT 
          Cat_TipTit,
          Cat_NumTit,
          Cat_DatVen,
          Cat_ValTit,
          Cat_SldTit,
          Cat_SitTit
        FROM IntCat
        WHERE LTRIM(RTRIM(Cat_CicCli)) = @0
          AND Cat_CodEmp = @1
          AND Cat_SitTit = 'A'
        ORDER BY Cat_DatVen
      `;
            const ultimoTituloLiquidadoQuery = `
        SELECT TOP 1
          Cat_TipTit,
          Cat_NumTit,
          Cat_DatVen,
          Cat_ValTit,
          Cat_SldTit,
          Cat_SitTit
        FROM IntCat
        WHERE LTRIM(RTRIM(Cat_CicCli)) = @0
          AND Cat_CodEmp = @1
          AND Cat_SitTit = 'L'
        ORDER BY Cat_DatVen DESC
      `;
            const [titulosAbertos, ultimoTituloLiquidado] = await Promise.all([
                this.cliRepository.query(titulosAbertosQuery, [cpfFormatado, clienteData.Cli_CodEmp]),
                this.cliRepository.query(ultimoTituloLiquidadoQuery, [cpfFormatado, clienteData.Cli_CodEmp])
            ]);
            return new dto_1.ClienteContratosResponseDto(clienteData, titulosAbertos, ultimoTituloLiquidado);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Erro ao buscar cliente por CPF: ${error.message}`);
        }
    }
    async buscarPorCelular(celular) {
        try {
            const clienteQuery = `
        SELECT DISTINCT
          cli.Cli_CodEmp,
          cli.Cli_CicCli,
          cli.Cli_NomCli,
          cli.Cli_EndCli,
          cli.Cli_BaiCli,
          cli.Cli_CidCli,
          cli.Cli_EstCli,
          cli.Cli_CepCli,
          cli.Cli_NumMat,
          cli.Cli_DatNas,
          cli.Cli_CelCli,
          cli.Cli_EmaCli
        FROM IntCli cli
        INNER JOIN IntCcl ccl ON cli.Cli_CodEmp = ccl.Ccl_CodEmp 
          AND LTRIM(RTRIM(cli.Cli_CicCli)) = LTRIM(RTRIM(ccl.Ccl_CicCli))
        WHERE LTRIM(RTRIM(cli.Cli_CelCli)) = @0
          AND ccl.Ccl_SitCcl = 'A'
          AND ccl.Ccl_CodFil IN ('03', '04', '05', '07', '09', '12', '14', '21', '25', '26', '90')
      `;
            const clienteResult = await this.cliRepository.query(clienteQuery, [celular]);
            if (!clienteResult || clienteResult.length === 0) {
                throw new common_1.NotFoundException('Cliente não encontrado');
            }
            const clienteData = clienteResult[0];
            const titulosAbertosQuery = `
        SELECT 
          Cat_TipTit,
          Cat_NumTit,
          Cat_DatVen,
          Cat_ValTit,
          Cat_SldTit,
          Cat_SitTit
        FROM IntCat
        WHERE LTRIM(RTRIM(Cat_CicCli)) = @0
          AND Cat_CodEmp = @1
          AND Cat_SitTit = 'A'
        ORDER BY Cat_DatVen
      `;
            const ultimoTituloLiquidadoQuery = `
        SELECT TOP 1
          Cat_TipTit,
          Cat_NumTit,
          Cat_DatVen,
          Cat_ValTit,
          Cat_SldTit,
          Cat_SitTit
        FROM IntCat
        WHERE LTRIM(RTRIM(Cat_CicCli)) = @0
          AND Cat_CodEmp = @1
          AND Cat_SitTit = 'L'
        ORDER BY Cat_DatVen DESC
      `;
            const [titulosAbertos, ultimoTituloLiquidado] = await Promise.all([
                this.cliRepository.query(titulosAbertosQuery, [clienteData.Cli_CicCli, clienteData.Cli_CodEmp]),
                this.cliRepository.query(ultimoTituloLiquidadoQuery, [clienteData.Cli_CicCli, clienteData.Cli_CodEmp])
            ]);
            return new dto_1.ClienteContratosResponseDto(clienteData, titulosAbertos, ultimoTituloLiquidado);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Erro ao buscar cliente por celular: ${error.message}`);
        }
    }
};
exports.ContratosService = ContratosService;
exports.ContratosService = ContratosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.IntCli)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.IntCcl)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.IntCat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ContratosService);
//# sourceMappingURL=contratos.service.js.map