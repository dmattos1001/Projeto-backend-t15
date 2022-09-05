import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entitys";
import { ProductOrder } from "./productOrder.entitys";

@Entity("provider")
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 200 })
  name: string;
  @Column({ length: 12 })
  telephone: string;
  @Column({ length: 100 })
  email: string;
  @Column({ length: 16 })
  cnpj: string;
  @Column({ length: 200 })
  address: string;
  @Column({ length: 40 })
  employee: string;
  @Column({ length: 15 })
  employeeCell: string;
  @OneToMany(() => Product, (Product) => Product.provider)
  product: Product[];
  @OneToMany(() => ProductOrder, (ProductOrder) => ProductOrder.provider)
  productOrder: ProductOrder[];
}
