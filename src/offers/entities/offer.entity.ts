import { Bank } from 'src/bank/entities/bank.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  offerId: string;

  @Column()
  offerTitle: string;

  @Column()
  offerDescription: string;

  @Column()
  offerLink: string;

  @Column()
  offerValidTill: Date;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // relations
  @ManyToOne(() => Bank, (bank) => bank.offers)
  @JoinColumn()
  bank: Bank;
}
