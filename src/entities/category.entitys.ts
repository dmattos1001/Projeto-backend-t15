import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entitys";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  nome: string;
  @Column({ length: 200 })
  description: string;
  @OneToOne(() => Product, (product) => product.category)
  product: Product;
}
