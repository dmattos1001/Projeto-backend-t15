import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entitys";
import { User } from "./user.entitys";

@Entity("outputProduct")
export class OutputProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 100 })
  descriptio: string;
  @Column()
  quantity: number;
  @CreateDateColumn()
  outputdate: Date;
  @ManyToOne(() => User, { eager: true })
  user: User;
  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;
}
