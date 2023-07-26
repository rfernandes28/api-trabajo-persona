import { MedicinesActivePrinciple } from '../../medicines-active-principles/entities/medicines-active-principle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => MedicinesActivePrinciple)
  @JoinColumn({
    name: 'medicines_active_principle_id',
    referencedColumnName: 'id',
  })
  medicinesActivePrinciple: MedicinesActivePrinciple;

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
}
