import { User } from '../../users/entities/user.entity';
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

@Entity({ name: 'entrance_of_medicines' })
export class EntranceOfMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'unit_quantity', nullable: true })
  unitQuantity: number;

  @Column({ type: 'int', name: 'boxes_quantity', nullable: true })
  boxesQuantity: number;

  @Column({ type: 'timestamptz', nullable: true })
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

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

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
