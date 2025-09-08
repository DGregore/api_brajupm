"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const contratos_module_1 = require("./contratos/contratos.module");
const entities_1 = require("./entities");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mssql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: parseInt(configService.get('DB_PORT', '1433')),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE', 'Contratos'),
                    entities: [entities_1.IntCli, entities_1.IntCcl, entities_1.IntCat],
                    synchronize: false,
                    logging: configService.get('DB_LOGGING', 'false') === 'true',
                    options: {
                        encrypt: configService.get('DB_ENCRYPT', 'false') === 'true',
                        trustServerCertificate: configService.get('DB_TRUST_CERT', 'true') === 'true',
                        enableArithAbort: true,
                        instanceName: '',
                    },
                    extra: {
                        validateParameters: false,
                        abortTransactionOnError: false,
                    },
                    connectionTimeout: 30000,
                    requestTimeout: 30000,
                }),
                inject: [config_1.ConfigService],
            }),
            contratos_module_1.ContratosModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map