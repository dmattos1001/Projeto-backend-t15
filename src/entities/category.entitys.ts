import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entitys";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  nome: string;
  @Column({ length: 200 })
  description: string;
  @OneToMany(() => Product, (Product) => Product.category)
  product: Product;
}
