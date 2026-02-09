import { Router, Response } from "express";
import { TenantRequest } from "../middleware/tenant.middleware";
import { getUsersPaginated } from "../services/user.service";
import { maskEmail, maskPhone } from "../utils/mask.util";
import { User } from "../entities/User";

const router = Router();

/**
 * GET /api/:tenantId/users?page=1&limit=10&role=admin|super-admin
 */
router.get("/users", async (req: TenantRequest, res: Response) => {
  try {
    const role = (req.query.role as string) || "admin";

    if (!role || !["admin", "super-admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
}

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const ds = req.tenantDataSource;
    const { users, total } = await getUsersPaginated(ds, page, limit);

    const result: User[] = users.map((u) => {
      if (role === "admin") {
        return {
          ...u,
          email: maskEmail(u.email),
          phone: maskPhone(u.phone)
        };
      }
      return u;
    });

    res.json({
      data: result,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;