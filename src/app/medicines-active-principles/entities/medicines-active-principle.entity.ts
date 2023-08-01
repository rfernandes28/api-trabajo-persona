import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { ActivePrinciple } from '../../active-principles/entities/active-principle.entity';
import { CommercialPresentation } from '../../commercial-presentations/entities/commercial-presentation.entity';

@Entity({ name: 'medicines_has_active_principles' })
export class MedicinesActivePrinciple {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  concentration: string;

  @ManyToOne(
    () => CommercialPresentation,
    (commercialPresentation) => commercialPresentation.activePrinciples,
  )
  @JoinColumn({
    name: 'commercial_presentation_id',
    referencedColumnName: 'id',
  })
  commercialPresentation: CommercialPresentation;

  @ManyToOne(() => ActivePrinciple)
  @JoinColumn({ name: 'active_principle_id', referencedColumnName: 'id' })
  activePrinciple: ActivePrinciple;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
