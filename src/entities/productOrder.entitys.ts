import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entitys";
import { User } from "./user.entitys";
@Entity("productOrder")
export class ProductOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column()
  quantityOfProducts: number;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  requestDate: Date;
  @ManyToOne(() => User, { eager: true })
  user: User;
  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
