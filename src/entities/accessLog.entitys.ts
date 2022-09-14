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
  @CreateDateColumn({ type: "date" })
  accessDate: string;
  @ManyToOne(() => User, { eager: true })
  user: User;
}
