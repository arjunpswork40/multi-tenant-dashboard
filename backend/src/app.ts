import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { tenantMiddleware } from "./middleware/tenant.middleware";

const app = express();
app.use(cors());
app.use(express.json());

// Tenant-aware routes
app.use("/api/:tenantId", tenantMiddleware, userRoutes);

export default app;
