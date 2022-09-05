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
import { Provider } from "./Provider.entitys";
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
  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;
  @OneToOne(() => Provider, { eager: true })
  @JoinColumn()
  provider: Provider;
}
