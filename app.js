import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

console.log(URI);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected! 😍"))
  .catch(() => console.log("Database is not connected! ☹️"));

mongoose.connection.on("error", (msg) => {
  console.log("Oopsi happened", msg);
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server started", PORT);
});
