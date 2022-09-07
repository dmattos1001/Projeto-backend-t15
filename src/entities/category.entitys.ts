import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entitys";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 200 })
  description: string;
  @OneToMany(() => Product, (Product) => Product.category)
  product: Product;
}
