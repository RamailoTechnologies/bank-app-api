import { Bank } from 'src/bank/entities/bank.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('smsBanking')
export class SmsBanking {
  @PrimaryGeneratedColumn('uuid')
  serviceId: string;

  @Column({ nullable: true })
  smsServiceNumber: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column({
    nullable: true,
  })
  isSms: boolean;

  @Column({ nullable: true })
  callServiceNumber: string;

  @Column()
  smsPattern: string;

  // relations
  @ManyToOne(() => Bank, (bank) => bank.smsBanking)
  @JoinColumn()
  bank: Bank;
}
