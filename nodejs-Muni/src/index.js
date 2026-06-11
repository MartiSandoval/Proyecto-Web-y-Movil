const { environment } = require("./core/config/environment");
const { createApp } = require("./core/server/createApp");

const app = createApp();

app.listen(environment.port, () => {
  console.log(`Servidor corriendo en http://localhost:${environment.port}`);
  console.log(`Entorno: ${environment.nodeEnv}`);
});
