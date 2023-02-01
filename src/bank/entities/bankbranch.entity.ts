import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from './bank.entity';

@Entity('Bankbranch')
export class BankBranch {
  @PrimaryGeneratedColumn('uuid')
  branchId: string;

  @Column()
  branchName: string;

  @Column()
  address: string;

  @Column()
  ifsc: string;

  // relations
  @ManyToOne(() => Bank, (bank) => bank.branch)
  @JoinColumn()
  bank: Bank;

  @OneToMany(() => Account, (account) => account.branch)
  account: Account[];
}
