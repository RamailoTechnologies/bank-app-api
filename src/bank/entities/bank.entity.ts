import { Account } from 'src/account/entities/account.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { SmsBanking } from 'src/sms-banking/entities/sms-banking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Bank')
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  bankId: string;

  @Column()
  bankName: string;

  @Column()
  logo: string;

  @Column({ nullable: true, default: false })
  isPopular: boolean;

  @Column({ nullable: true })
  customerCareNumber: string;

  //relations

  @OneToMany(() => SmsBanking, (sms) => sms.bank)
  smsBanking: SmsBanking[];

  @OneToMany(() => Account, (account) => account.bank, {
    cascade: true,
  })
  account: Account[];
}
