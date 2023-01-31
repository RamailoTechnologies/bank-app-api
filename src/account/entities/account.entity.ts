import { Bank } from 'src/bank/entities/bank.entity';
import { BankBranch } from 'src/bank/entities/bankbranch.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @Column()
  accountName: string;

  @Column()
  accountNumber: string;

  @Column({ nullable: true })
  amount: string;

  //relations
  @OneToOne(() => User, (user) => user.account)
  @JoinColumn()
  user: User;

  @OneToOne(() => BankBranch, (branch) => branch.account)
  @JoinColumn()
  branch: BankBranch;
}
