import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entitys";
import { Provider } from "./provider.entitys";
import { User } from "./user.entitys";

@Entity("productEntry")
export class ProductEntry {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @CreateDateColumn({ type: "date" })
  receivedD: string;
  @Column()
  quantity: number;
  @ManyToOne(() => User, { eager: true })
  user: User;
  @ManyToOne(() => Product, { eager: true })
  product: Product;
  @ManyToOne(() => Provider)
  provider: Provider;
}
