require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Modo: ${process.env.USE_MOCK !== "false" ? "mock" : "Supabase"}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
});
