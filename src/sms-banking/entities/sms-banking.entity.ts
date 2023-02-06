import { Bank } from 'src/bank/entities/bank.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum smsBankingFormate {
  BALANCEENQUIRY = 'balanceenquiry',
  MINISTATEMENT = 'ministatement',
  STOPCHEQUE = 'stopcheque',
  CHECKSTATUS = 'checkstatus',
  CHANGEMPIN = 'changempin',
}

@Entity('smsBanking')
export class SmsBanking {
  @PrimaryGeneratedColumn('uuid')
  serviceId: string;

  @Column({ nullable: true })
  smsServiceNumber: string;

  @Column({
    type: 'enum',
    enum: smsBankingFormate,
  })
  category: smsBankingFormate;

  @Column({ nullable: true })
  callServiceNumber: string;

  @Column()
  smsPattern: string;

  // relations
  @ManyToOne(() => Bank, (bank) => bank.smsBanking)
  @JoinColumn()
  bank: Bank;
}
