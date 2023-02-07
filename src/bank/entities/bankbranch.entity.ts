import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from './bank.entity';

@Entity('Bankbranch')
export class BankBranch {
  @PrimaryColumn()
  branchIfsc: string;

  @Column()
  branchName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  address: string;

  // relations
  @ManyToOne(() => Bank, (bank) => bank.branch)
  @JoinColumn()
  bank: Bank;

  @OneToMany(() => Account, (account) => account.branch)
  account: Account[];
}
