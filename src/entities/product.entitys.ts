import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entitys";
import { OutputProduct } from "./outputProduct.entitys";
import { ProductEntry } from "./ProductEntry.entitys";
import { ProductOrder } from "./productOrder.entitys";
import { Provider } from "./provider.entitys";

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
  criticalStock: number;
  @ManyToOne(() => Provider, { eager: true })
  provider: Provider;
  @ManyToOne(() => Category, { eager: true })
  category: Category;
  @OneToMany(() => OutputProduct, (OutputProduct) => OutputProduct.product)
  outputProduct: OutputProduct[];
  @OneToMany(() => ProductEntry, (ProductEntry) => ProductEntry.product)
  productEntry: ProductEntry[];
  @OneToMany(() => ProductOrder, (ProductOrder) => ProductOrder.product)
  productOrder: ProductOrder[];
}
