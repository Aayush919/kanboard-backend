// src/server.ts

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createServer as httpcreateServer } from "node:http";
import Kanbanrouter from './KanbanBoard/Routes'
import { ServerError } from "./Error/ServerError";


// import connectToMongoDB from "Config/db";
import Appconfig from "./Config/Appconfig";
import connectToMongoDB from "./Config/db";


import { NotFound } from "./Error/NotFound";




// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler


/* ------------------------ PROCESS LEVEL ERROR HANDLERS ------------------------ */
process.on("unhandledRejection", (err: any) => {
  console.error("Unhandled Rejection:", err?.name, err?.message);
  process.exit(1);
});

process.on("uncaughtException", (err: any) => {
  console.error("Uncaught Exception:", err?.name, err?.message);
  process.exit(1);
});

/* ------------------------ APP INITIALIZATION ------------------------ */
const app = express();
const appserver = httpcreateServer(app);






/* ------------------------ MIDDLEWARE ------------------------ */





/* ------------------------ MIDDLEWARE ------------------------ */
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());




app.use("/api",Kanbanrouter)

app.use(NotFound);
app.use(ServerError);

/* ------------------------ DB + SERVER START ------------------------ */
try {
   connectToMongoDB();
} catch (error) {
  console.error(" Failed to connect DB:", error);
  process.exit(1);
}

  appserver.listen(Appconfig.port, () => {
    console.log(` Server is running on port ${Appconfig.port}`);
  });

   