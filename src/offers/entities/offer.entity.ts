import { Bank } from 'src/bank/entities/bank.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum loanCategory {
  PEROSNAL_LOAN = 'personalLoan',
  CREDIT_CARD = 'creditCard',
  ACCOUNT_OPENING = 'accountOpening',
  HOME_LOAN = 'homeLoan',
}

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

  @Column({ type: 'enum', enum: loanCategory })
  category: loanCategory;

  // relations
  @ManyToOne(() => Bank, (bank) => bank.offers)
  @JoinColumn()
  bank: Bank;
}
