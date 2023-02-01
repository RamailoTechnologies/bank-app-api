import { Account } from 'src/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('user')
export class User {
  @Column({ primary: true })
  userId: string;

  @Column()
  phone: string;

  // relations
  @OneToMany(() => Account, (account) => account.user)
  account: Account;
}
