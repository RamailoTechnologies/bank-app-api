import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ifsc')
export class IFSC {
  @Column()
  bank: string;

  @PrimaryColumn()
  ifsc: string;

  @Column()
  branch: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  imps: string;

  @Column()
  rtgs: string;

  @Column()
  city: string;

  @Column()
  iso3166: string;

  @Column()
  neft: string;

  @Column()
  micr: string;

  @Column()
  upi: string;

  @Column({ nullable: true })
  swift: string;
}
