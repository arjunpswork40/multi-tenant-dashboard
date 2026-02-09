import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tenant } from "../entities/Tenant";

export const MasterDataSource = new DataSource({
  type: "postgres",
  host: process.env.MASTER_DB_HOST || "localhost",
  port: Number(process.env.MASTER_DB_PORT || 5432),
  username: process.env.MASTER_DB_USER || "postgres",
  password: process.env.MASTER_DB_PASSWORD || "2580",
  database: process.env.MASTER_DB_NAME || "master_db",
  entities: [Tenant],
  synchronize: true
});