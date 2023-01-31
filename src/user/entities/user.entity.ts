import { Account } from 'src/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('user')
export class User {
  @Column({ primary: true, unique: true })
  userId: string;

  @Column({ unique: true })
  phone: string;

  // relations
  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn()
  account: Account;
}
