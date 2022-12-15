import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 70 })
  district: string;
  @Column({ length: 11 })
  zipCode: string;
  @Column({ length: 20 })
  number: string;
  @Column({ length: 40 })
  city: string;
  @Column({ length: 2 })
  state: string;
}
