import { Bank } from 'src/bank/entities/bank.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @Column({ nullable: true })
  accountName: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  ifsc: string;

  //relations
  @ManyToOne(() => User, (user) => user.account)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Bank, (bank) => bank.account)
  @JoinColumn()
  bank: Bank;
}
