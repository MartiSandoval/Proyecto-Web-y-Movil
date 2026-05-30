require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const tramitesRouter = require("./routes/tramites");
const disponibilidadRouter = require("./routes/disponibilidad");
const citasRouter = require("./routes/citas");
const sucursalesRouter = require("./routes/sucursales");


const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok", message: "Servidor de trámites municipales" }));

app.use("/tramites", tramitesRouter);
app.use("/disponibilidad", disponibilidadRouter);
app.use("/citas", citasRouter);
app.use("/sucursales", sucursalesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
