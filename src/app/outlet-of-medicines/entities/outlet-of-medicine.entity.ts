import { Patient } from '../../patients/entities/patient.entity';
import { CommercialPresentation } from '../../commercial-presentations/entities/commercial-presentation.entity';
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

  @ManyToOne(() => CommercialPresentation)
  @JoinColumn({
    name: 'commercial_presentation_id',
    referencedColumnName: 'id',
  })
  commercialPresentation: CommercialPresentation;

  @ManyToOne(() => Patient)
  @JoinColumn({
    name: 'patient_id',
    referencedColumnName: 'id',
  })
  patient: Patient;

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
