import express from "express";
import router from "./src/routes/index.js";

import cors from "cors";

import connectDB from "./src/common/configs/db.js";
import { HOST, PORT } from "./src/common/configs/enviroments.js";
import setupSwagger from "./src/common/configs/swagger-config.js";
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api", router);
setupSwagger(app);
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});
