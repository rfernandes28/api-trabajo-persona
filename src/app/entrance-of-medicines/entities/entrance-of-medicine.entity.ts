import { getDataSourceName } from '@nestjs/typeorm';
import { CommercialPresentation } from '../../commercial-presentations/entities/commercial-presentation.entity';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  getManager,
} from 'typeorm';

@Entity({ name: 'entrance_of_medicines' })
export class EntranceOfMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'unit_quantity', nullable: true })
  unitQuantity: number;

  @Column({ type: 'int', name: 'boxes_quantity', nullable: true })
  boxesQuantity: number;

  @Column({ type: 'timestamptz' })
  expiration: Date;

  @Column({ type: 'boolean', default: false })
  expire: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  donor: string;

  @ManyToOne(() => CommercialPresentation)
  @JoinColumn({
    name: 'commercial_presentation_id',
    referencedColumnName: 'id',
  })
  commercialPresentation: CommercialPresentation;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  // @AfterInsert()
  // async resetCounters() {
  //   console.log('AfterInsert>>');

  //     getRepository(CommercialPresentation)
  //     .createQueryBuilder()
  //     .update(CommercialPresentation)
  //     .set({ stock: () => 'stock + :unitQuantity' })
  //     .setParameters({ unitQuantity: this.unitQuantity });
  // }
}
