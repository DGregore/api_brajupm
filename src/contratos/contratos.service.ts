

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntCli, IntCcl, IntCat } from '../entities';
import { ClienteContratosResponseDto } from '../dto';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(IntCli)
    private readonly cliRepository: Repository<IntCli>,
    @InjectRepository(IntCcl)
    private readonly cclRepository: Repository<IntCcl>,
    @InjectRepository(IntCat)
    private readonly catRepository: Repository<IntCat>,
  ) {}

  /**
   * Formata o CPF adicionando zeros à esquerda para completar 14 dígitos
   * @param cpf CPF a ser formatado
   * @returns CPF com 14 dígitos
   */
  private padCpf(cpf: string): string {
    // Remove espaços em branco e garante que seja uma string
    const cleanCpf = cpf.toString().trim();
    // Adiciona zeros à esquerda até completar 14 dígitos
    return cleanCpf.padStart(14, '0');
  }

  async buscarPorCpf(cpf: string): Promise<ClienteContratosResponseDto> {
    // Formatar CPF com padding de zeros à esquerda para 14 dígitos
    const cpfFormatado = this.padCpf(cpf);

    try {
      // PRIMEIRA CONSULTA: Buscar dados do cliente (sem restrições de títulos)
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
        throw new NotFoundException('Cliente não encontrado');
      }

      const clienteData = clienteResult[0];

      // SEGUNDA CONSULTA: Buscar títulos específicos
      // Subconsulta A: TODOS os títulos em aberto (Cat_SitTit = 'A')
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

      // Subconsulta B: ÚLTIMO título liquidado (Cat_SitTit = 'L')
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

      // Executar ambas as consultas de títulos
      const [titulosAbertos, ultimoTituloLiquidado] = await Promise.all([
        this.cliRepository.query(titulosAbertosQuery, [cpfFormatado, clienteData.Cli_CodEmp]),
        this.cliRepository.query(ultimoTituloLiquidadoQuery, [cpfFormatado, clienteData.Cli_CodEmp])
      ]);

      // Retornar com arrays separados
      return new ClienteContratosResponseDto(clienteData, titulosAbertos, ultimoTituloLiquidado);

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Erro ao buscar cliente por CPF: ${error.message}`);
    }
  }

  async buscarPorCelular(celular: string): Promise<ClienteContratosResponseDto> {
    try {
      // PRIMEIRA CONSULTA: Buscar dados do cliente (sem restrições de títulos)
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
        throw new NotFoundException('Cliente não encontrado');
      }

      const clienteData = clienteResult[0];

      // SEGUNDA CONSULTA: Buscar títulos específicos
      // Subconsulta A: TODOS os títulos em aberto (Cat_SitTit = 'A')
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

      // Subconsulta B: ÚLTIMO título liquidado (Cat_SitTit = 'L')
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

      // Executar ambas as consultas de títulos
      const [titulosAbertos, ultimoTituloLiquidado] = await Promise.all([
        this.cliRepository.query(titulosAbertosQuery, [clienteData.Cli_CicCli, clienteData.Cli_CodEmp]),
        this.cliRepository.query(ultimoTituloLiquidadoQuery, [clienteData.Cli_CicCli, clienteData.Cli_CodEmp])
      ]);

      // Retornar com arrays separados
      return new ClienteContratosResponseDto(clienteData, titulosAbertos, ultimoTituloLiquidado);

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Erro ao buscar cliente por celular: ${error.message}`);
    }
  }
}

