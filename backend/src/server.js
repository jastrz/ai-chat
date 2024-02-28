import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { createServer } from "http";
import { initSocketServer } from "./socketServer.js";
import { router } from "./routes.js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

const server = createServer(app);
initSocketServer(server);

app.use(router);

const port = process.env.PORT || 3001;
const ipAddress = process.env.IP_ADDRESS || "0.0.0.0";

server.listen(port, ipAddress, () => {
  console.log(`Server running at http://${ipAddress}:${port}/`);
});
