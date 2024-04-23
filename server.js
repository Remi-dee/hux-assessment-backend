const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
const app = express();
app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.use("/users", userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
