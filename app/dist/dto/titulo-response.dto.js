"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TituloResponseDto = void 0;
class TituloResponseDto {
    tipTit;
    numTit;
    datVen;
    valTit;
    sldTit;
    sitTit;
    constructor(titulo) {
        this.tipTit = titulo.Cat_TipTit;
        this.numTit = titulo.Cat_NumTit;
        this.datVen = titulo.Cat_DatVen;
        this.valTit = parseFloat(titulo.Cat_ValTit) || 0;
        this.sldTit = parseFloat(titulo.Cat_SldTit) || 0;
        this.sitTit = titulo.Cat_SitTit;
    }
}
exports.TituloResponseDto = TituloResponseDto;
//# sourceMappingURL=titulo-response.dto.js.map