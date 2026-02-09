import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tenants")
export class Tenant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  tenant_key!: string;

  @Column()
  db_host!: string;

  @Column()
  db_port!: number;

  @Column()
  db_user!: string;

  @Column()
  db_password!: string;

  @Column()
  db_name!: string;
}