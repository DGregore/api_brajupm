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
exports.IntCcl = void 0;
const typeorm_1 = require("typeorm");
const int_cli_entity_1 = require("./int-cli.entity");
let IntCcl = class IntCcl {
    Ccl_CodEmp;
    Ccl_CicCli;
    Ccl_CodFil;
    Ccl_SitCcl;
    Ccl_IniCon;
    Ccl_NumCon;
    cliente;
};
exports.IntCcl = IntCcl;
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], IntCcl.prototype, "Ccl_CodEmp", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], IntCcl.prototype, "Ccl_CicCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], IntCcl.prototype, "Ccl_CodFil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1, nullable: true }),
    __metadata("design:type", String)
], IntCcl.prototype, "Ccl_SitCcl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], IntCcl.prototype, "Ccl_IniCon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], IntCcl.prototype, "Ccl_NumCon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => int_cli_entity_1.IntCli, cli => cli.contratos),
    (0, typeorm_1.JoinColumn)([
        { name: 'Ccl_CodEmp', referencedColumnName: 'Cli_CodEmp' },
        { name: 'Ccl_CicCli', referencedColumnName: 'Cli_CicCli' }
    ]),
    __metadata("design:type", int_cli_entity_1.IntCli)
], IntCcl.prototype, "cliente", void 0);
exports.IntCcl = IntCcl = __decorate([
    (0, typeorm_1.Entity)('IntCcl')
], IntCcl);
//# sourceMappingURL=int-ccl.entity.js.map