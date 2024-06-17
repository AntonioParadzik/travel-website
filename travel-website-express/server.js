import express from "express";
import cors from "cors";
import config from "./config.js";
import allRoutes from "./routes/allRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//routes
app.use("/api", allRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server g");
});

app.listen(5000, () => console.log(`Server is live @ ${config.hostUrl}`));
