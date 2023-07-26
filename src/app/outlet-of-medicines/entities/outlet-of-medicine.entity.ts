import { Medicine } from '../../medicines/entities/medicine.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'outlet_of_medicines' })
export class OutletOfMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  unitQuantity: number;

  @ManyToOne(() => Medicine)
  @JoinColumn({
    name: 'medicine_id',
    referencedColumnName: 'id',
  })
  medicine: Medicine;

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
