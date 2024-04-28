import express from "express";
import cors from "cors";
import config from "./config.js";
import productRoute from "./routes/productRoute.js";
import initializeFirebaseApp from "./firebase.js";

const app = express();

app.use(cors());
app.use(express.json());

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//routes
app.use("/api", productRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server g");
});

app.post("/api/new", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    // Perform database operation
    console.log("Product created successfully");
    res.status(200).send("Product created successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => console.log(`Server is live @ ${config.hostUrl}`));
