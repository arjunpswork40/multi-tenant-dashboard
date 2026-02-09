import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRole = "admin" | "super-admin";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  role!: UserRole;
}