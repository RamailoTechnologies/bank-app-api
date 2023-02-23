import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ifsc')
export class IFSC {
  @Column({ nullable: true })
  bank: string;

  @PrimaryColumn()
  ifsc: string;

  @Column({ nullable: true })
  branch: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  imps: string;

  @Column({ nullable: true })
  rtgs: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  iso3166: string;

  @Column({ nullable: true })
  neft: string;

  @Column({ nullable: true })
  micr: string;

  @Column({ nullable: true })
  upi: string;

  @Column({ nullable: true })
  swift: string;
}
