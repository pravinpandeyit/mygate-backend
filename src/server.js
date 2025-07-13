const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes");
const { generalLimiter } = require("./core/middlewares/rateLimiter");
const errorHandler = require("./utils/errorHandler");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected & Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
});
