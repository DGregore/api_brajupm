
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IntCli } from './int-cli.entity';

@Entity('IntCat')
export class IntCat {
  @Column({ primary: true, type: 'varchar', length: 10 })
  Cat_CodEmp: string;

  @Column({ primary: true, type: 'varchar', length: 15 })
  Cat_CicCli: string;

  @Column({ primary: true, type: 'varchar', length: 5 })
  Cat_TipTit: string;

  @Column({ primary: true, type: 'varchar', length: 20 })
  Cat_NumTit: string;

  @Column({ type: 'datetime', nullable: true })
  Cat_DatVen: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  Cat_ValTit: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  Cat_SldTit: number;

  @Column({ type: 'varchar', length: 1, nullable: true })
  Cat_SitTit: string;

  @ManyToOne(() => IntCli, cli => cli.titulos)
  @JoinColumn([
    { name: 'Cat_CodEmp', referencedColumnName: 'Cli_CodEmp' },
    { name: 'Cat_CicCli', referencedColumnName: 'Cli_CicCli' }
  ])
  cliente: IntCli;
}
