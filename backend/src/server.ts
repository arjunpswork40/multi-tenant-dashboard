import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { MasterDataSource } from "./data-source/master-data-source";


const PORT = 4000;

const bootstrap = async () => {
  try {
    console.log("🔄 Connecting to Master DB...");
    await MasterDataSource.initialize();
    console.log("✅ Master DB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect Master DB:", error);
    process.exit(1);
  }
};

bootstrap();
