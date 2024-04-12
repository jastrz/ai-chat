import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { createServer } from "http";
import { initSocketServer } from "./socketServer/socketServer.js";
import { router } from "./routes/router.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as sdService from "./services/sdService.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerSpec.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

const server = createServer(app);
initSocketServer(server);
await sdService.initialize();

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3001;
const ipAddress = process.env.IP_ADDRESS || "0.0.0.0";
const useDb = process.env.USE_DB.toLowerCase() === "true";

if (useDb) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      server.listen(port, ipAddress, () => {
        console.log(`Server running at http://${ipAddress}:${port}/`);
      });
    })
    .catch((err) => {
      console.log("MongoDB connection failed.");
      console.log(err);
    });
} else {
  server.listen(port, ipAddress, () => {
    console.log(`Server running at http://${ipAddress}:${port}/`);
  });
}
