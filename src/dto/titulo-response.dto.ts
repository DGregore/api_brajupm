
export class TituloResponseDto {
  tipTit: string;
  numTit: string;
  datVen: Date;
  valTit: number;
  sldTit: number;
  sitTit: string;

  constructor(titulo: any) {
    this.tipTit = titulo.Cat_TipTit;
    this.numTit = titulo.Cat_NumTit;
    this.datVen = titulo.Cat_DatVen;
    this.valTit = parseFloat(titulo.Cat_ValTit) || 0;
    this.sldTit = parseFloat(titulo.Cat_SldTit) || 0;
    this.sitTit = titulo.Cat_SitTit;
  }
}
