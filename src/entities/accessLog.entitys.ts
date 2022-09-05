import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitys";
@Entity("accessLog")
export class AccessLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @CreateDateColumn()
  accessDate: Date;
  @ManyToOne(() => User, { eager: true })
  user: User;
}
