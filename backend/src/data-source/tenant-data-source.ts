import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Tenant } from "../entities/Tenant";

const tenantConnections = new Map<string, DataSource>();

export const getTenantDataSource = async (tenant: Tenant): Promise<DataSource> => {
  if (tenantConnections.has(tenant.tenant_key)) {
    return tenantConnections.get(tenant.tenant_key)!;
  }

  const ds = new DataSource({
    type: "postgres",
    host: tenant.db_host,
    port: tenant.db_port,
    username: tenant.db_user,
    password: tenant.db_password,
    database: tenant.db_name,
    entities: [User],
    synchronize: true
  });

  await ds.initialize();
  tenantConnections.set(tenant.tenant_key, ds);
  return ds;
};