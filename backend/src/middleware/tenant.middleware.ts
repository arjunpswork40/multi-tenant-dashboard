import { NextFunction, Request, Response } from "express";
import { MasterDataSource } from "../data-source/master-data-source";
import { Tenant } from "../entities/Tenant";
import { getTenantDataSource } from "../data-source/tenant-data-source";

export interface TenantRequest extends Request {
  tenantKey?: string;
  tenantDataSource?: any;
}

export const tenantMiddleware = async (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tenantKey = req.params.tenantId;
    if (!tenantKey) {
      return res.status(400).json({ message: "Tenant ID missing in path" });
    }

    const tenantRepo = MasterDataSource.getRepository(Tenant);
    const tenant = await tenantRepo.findOne({ where: { tenant_key: tenantKey } });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const tenantDS = await getTenantDataSource(tenant);

    req.tenantKey = tenantKey;
    req.tenantDataSource = tenantDS;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tenant resolution failed" });
  }
};