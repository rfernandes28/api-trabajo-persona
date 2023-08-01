import { Exclude } from 'class-transformer';
import { MedicinesActivePrinciple } from '../../medicines-active-principles/entities/medicines-active-principle.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Presentation } from '../../presentations/entities/presentation.entity';
import { Package } from '../../packages/entities/package.entity';
import { Medicine } from '../../medicines/entities/medicine.entity';

@Entity({ name: 'commercial_presentations' })
export class CommercialPresentation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', name: 'stock', nullable: true })
  stock: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.commercialPresentations)
  @JoinColumn({ name: 'medicine_id', referencedColumnName: 'id' })
  medicine: Medicine;

  @ManyToOne(() => Presentation)
  @JoinColumn({ name: 'presentation_id', referencedColumnName: 'id' })
  presentation: Presentation;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id', referencedColumnName: 'id' })
  package: Package;

  @OneToMany(
    () => MedicinesActivePrinciple,
    (medicinesActivePrinciple) =>
      medicinesActivePrinciple.commercialPresentation,
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
