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
exports.IntCat = void 0;
const typeorm_1 = require("typeorm");
const int_cli_entity_1 = require("./int-cli.entity");
let IntCat = class IntCat {
    Cat_CodEmp;
    Cat_CicCli;
    Cat_TipTit;
    Cat_NumTit;
    Cat_DatVen;
    Cat_ValTit;
    Cat_SldTit;
    Cat_SitTit;
    cliente;
};
exports.IntCat = IntCat;
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], IntCat.prototype, "Cat_CodEmp", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], IntCat.prototype, "Cat_CicCli", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 5 }),
    __metadata("design:type", String)
], IntCat.prototype, "Cat_TipTit", void 0);
__decorate([
    (0, typeorm_1.Column)({ primary: true, type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], IntCat.prototype, "Cat_NumTit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], IntCat.prototype, "Cat_DatVen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], IntCat.prototype, "Cat_ValTit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], IntCat.prototype, "Cat_SldTit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1, nullable: true }),
    __metadata("design:type", String)
], IntCat.prototype, "Cat_SitTit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => int_cli_entity_1.IntCli, cli => cli.titulos),
    (0, typeorm_1.JoinColumn)([
        { name: 'Cat_CodEmp', referencedColumnName: 'Cli_CodEmp' },
        { name: 'Cat_CicCli', referencedColumnName: 'Cli_CicCli' }
    ]),
    __metadata("design:type", int_cli_entity_1.IntCli)
], IntCat.prototype, "cliente", void 0);
exports.IntCat = IntCat = __decorate([
    (0, typeorm_1.Entity)('IntCat')
], IntCat);
//# sourceMappingURL=int-cat.entity.js.map