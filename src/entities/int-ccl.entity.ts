
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IntCli } from './int-cli.entity';

@Entity('IntCcl')
export class IntCcl {
  @Column({ primary: true, type: 'varchar', length: 10 })
  Ccl_CodEmp: string;

  @Column({ primary: true, type: 'varchar', length: 15 })
  Ccl_CicCli: string;

  @Column({ primary: true, type: 'varchar', length: 10 })
  Ccl_CodFil: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  Ccl_SitCcl: string;

  @Column({ type: 'datetime', nullable: true })
  Ccl_IniCon: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Ccl_NumCon: string;

  @ManyToOne(() => IntCli, cli => cli.contratos)
  @JoinColumn([
    { name: 'Ccl_CodEmp', referencedColumnName: 'Cli_CodEmp' },
    { name: 'Ccl_CicCli', referencedColumnName: 'Cli_CicCli' }
  ])
  cliente: IntCli;
}
