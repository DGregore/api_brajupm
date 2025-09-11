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
exports.ContratosController = void 0;
const common_1 = require("@nestjs/common");
const contratos_service_1 = require("./contratos.service");
const auth_1 = require("../auth");
let ContratosController = class ContratosController {
    contratosService;
    constructor(contratosService) {
        this.contratosService = contratosService;
    }
    async buscarPorCpf(cpf) {
        try {
            if (!/^\d{11,15}$/.test(cpf)) {
                throw new common_1.HttpException('CPF deve conter entre 11 e 15 dígitos numéricos', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.contratosService.buscarPorCpf(cpf);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro interno do servidor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async buscarPorCelular(celular) {
        try {
            if (!/^\d+$/.test(celular)) {
                throw new common_1.HttpException('Celular deve conter apenas dígitos numéricos', common_1.HttpStatus.BAD_REQUEST);
            }
            if (celular.length < 10 || celular.length > 15) {
                throw new common_1.HttpException('Celular deve ter entre 10 e 15 dígitos', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.contratosService.buscarPorCelular(celular);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro interno do servidor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ContratosController = ContratosController;
__decorate([
    (0, common_1.Get)('cpf/:cpf'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "buscarPorCpf", null);
__decorate([
    (0, common_1.Get)('celular/:celular'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Param)('celular')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContratosController.prototype, "buscarPorCelular", null);
exports.ContratosController = ContratosController = __decorate([
    (0, common_1.Controller)('contratos'),
    __metadata("design:paramtypes", [contratos_service_1.ContratosService])
], ContratosController);
//# sourceMappingURL=contratos.controller.js.map