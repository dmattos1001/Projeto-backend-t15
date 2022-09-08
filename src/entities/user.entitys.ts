import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccessLog } from "./accessLog.entitys";
import { Address } from "./address.entitys";
import { OutputProduct } from "./outputProduct.entitys";
import { ProductEntry } from "./ProductEntry.entitys";
import { ProductOrder } from "./productOrder.entitys";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 15 })
  cpf: string;
  @Column({ length: 50 })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  contractDate: Date;
  @Column()
  administrationNivel: number;
  @Column({ default: true })
  isActive: boolean;
  @Column({ length: 30 })
  occupation: string;
  @Column({ length: 15 })
  telephone: string;
  @Column({ length: 15 })
  cell: string;
  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;
  @OneToMany(() => ProductEntry, (ProductEntry) => ProductEntry.user)
  productEntry: ProductEntry[];
  @OneToMany(() => AccessLog, (AccessLog) => AccessLog.user)
  accessLog: AccessLog[];
  @OneToMany(() => ProductOrder, (ProductOrder) => ProductOrder.user)
  productOrder: ProductOrder[];
  @OneToMany(() => OutputProduct, (OutputProduct) => OutputProduct.user)
  outputProduct: OutputProduct;
}
