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
import { Provider } from "./provider.entitys";
import { User } from "./user.entitys";

@Entity("productOrder")
export class ProductOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column()
  quantityOfProducts: number;
  @CreateDateColumn()
  requestDate: Date;
  @ManyToOne(() => User, { eager: true })
  user: User;
  @ManyToOne(() => Provider, { eager: true })
  provider: Provider;
  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;
}
