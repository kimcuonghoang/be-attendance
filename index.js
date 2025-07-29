import express from "express";
import router from "./src/routes/index.js";

import cors from "cors";

import connectDB from "./src/common/configs/db.js";
import { HOST, PORT } from "./src/common/configs/enviroments.js";
import setupSwagger from "./src/common/configs/swagger-config.js";
import jsonValidator from "./src/common/middleware/json.middleware.js";
import notFoundHandler from "./src/common/middleware/notFound.middleware.js";
import errorHandler from "./src/common/middleware/error.middleware.js";
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
// Middleware xử lý JSON không hợp lệ
app.use(jsonValidator);

// Middleware xử lý route không tồn tại
app.use(notFoundHandler);

// Middleware xử lý lỗi chung
app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});
