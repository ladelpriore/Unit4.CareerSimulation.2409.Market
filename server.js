//Handlers for routes, 404, error, start

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./api/auth").router);
app.use("/orders", require("./api/orders"));
app.use("/products", require("./api/products"));

app.use((req, res, next) => {
  next({ status: 404, message: "No endpoint." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});