import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entitys";
import { Provider } from "./Provider.entitys";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 200 })
  description: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  value: number;
  @Column()
  saleValue: number;
  @Column()
  stock: number;
  @Column()
  criticalStock: string;
  @ManyToOne(() => Provider, { eager: true })
  provider: Provider;
  @ManyToOne(() => Category, { eager: true })
  category: Category;
}
