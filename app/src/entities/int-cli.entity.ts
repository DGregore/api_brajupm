
import { Entity, Column, OneToMany } from 'typeorm';
import { IntCcl } from './int-ccl.entity';
import { IntCat } from './int-cat.entity';

@Entity('IntCli')
export class IntCli {
  @Column({ primary: true, type: 'varchar', length: 10 })
  Cli_CodEmp: string;

  @Column({ primary: true, type: 'varchar', length: 15 })
  Cli_CicCli: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Cli_NomCli: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Cli_EndCli: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Cli_BaiCli: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Cli_CidCli: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  Cli_EstCli: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  Cli_CepCli: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Cli_NumMat: string;

  @Column({ type: 'datetime', nullable: true })
  Cli_DatNas: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  Cli_CelCli: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Cli_EmaCli: string;

  @OneToMany(() => IntCcl, ccl => ccl.cliente)
  contratos: IntCcl[];

  @OneToMany(() => IntCat, cat => cat.cliente)
  titulos: IntCat[];
}
