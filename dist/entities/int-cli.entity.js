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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntCli = void 0;
const typeorm_1 = require("typeorm");
const int_ccl_entity_1 = require("./int-ccl.entity");
const int_cat_entity_1 = require("./int-cat.entity");
let IntCli = class IntCli {
    Cli_CodEmp;
    Cli_CicCli;
    Cli_NomCli;
    Cli_EndCli;
    Cli_BaiCli;
    Cli_CidCli;
    Cli_EstCli;
    Cli_CepCli;
    Cli_NumMat;
    Cli_DatNas;
    Cli_CelCli;
    Cli_EmaCli;
    contratos;
    titulos;
};
exports.IntCli = IntCli;
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_CodEmp", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_CicCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_NomCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_EndCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_BaiCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_CidCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_EstCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_CepCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_NumMat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], IntCli.prototype, "Cli_DatNas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_CelCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], IntCli.prototype, "Cli_EmaCli", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => int_ccl_entity_1.IntCcl, ccl => ccl.cliente),
    __metadata("design:type", Array)
], IntCli.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => int_cat_entity_1.IntCat, cat => cat.cliente),
    __metadata("design:type", Array)
], IntCli.prototype, "titulos", void 0);
exports.IntCli = IntCli = __decorate([
    (0, typeorm_1.Entity)('IntCli')
], IntCli);
//# sourceMappingURL=int-cli.entity.js.map