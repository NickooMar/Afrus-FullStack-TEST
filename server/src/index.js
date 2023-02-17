import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/products.routes.js";
import costumersRoutes from "./routes/costumers.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import eventsRoutes from "./routes/events.routes.js";

// Enviroment Variables
dotenv.config();

const app = express();
const PORT = 4000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// Routes
app.use("/products", productRoutes);
app.use("/costumers", costumersRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/events", eventsRoutes);

// Init Server
const serverStart = async () => {
  app.listen(PORT, () => {
    console.log(`Server Listening on: http://localhost:${PORT} 🚀`);
  });
};

serverStart();
