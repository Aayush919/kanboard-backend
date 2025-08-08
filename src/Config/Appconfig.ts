// config/AppConfig.ts

import dotenv from "dotenv";

dotenv.config();

class AppConfig {
  port: number;
  databaseUrl: string;
  

  constructor() {
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.databaseUrl = process.env.DATABASE_URL || "";

 
  }
}

export default new AppConfig();
