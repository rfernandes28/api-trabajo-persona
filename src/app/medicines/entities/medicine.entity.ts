import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { MedicinesActivePrinciple } from '../../medicines-active-principles/entities/medicines-active-principle.entity';

@Entity({ name: 'medicines' })
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @OneToMany(
    () => MedicinesActivePrinciple,
    (medicinesActivePrinciple) => medicinesActivePrinciple.medicine,
  )
  activePrinciples: MedicinesActivePrinciple[];

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
