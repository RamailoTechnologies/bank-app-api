import { Account } from 'src/account/entities/account.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { SmsBanking } from 'src/sms-banking/entities/sms-banking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BankBranch } from './bankbranch.entity';

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

  @OneToMany(() => BankBranch, (branch) => branch.bank)
  branch: BankBranch[];

  @OneToMany(() => SmsBanking, (sms) => sms.bank)
  smsBanking: SmsBanking[];

  @OneToMany(() => Offer, (offer) => offer.bank)
  offers: Offer[];

  @OneToMany(() => Account, (account) => account.bank, {
    cascade: true, // <= here
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: Account[];
}
