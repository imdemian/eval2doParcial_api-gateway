const gateway = require("fast-gateway");
const cors = require("cors");

const PORT = process.env.PORT || 3500;
const server = gateway({
  routes: [
    {
      prefix: "/equipos",
      target: "https://eval2do-parcial-servicio-equipos.vercel.app/api/equipos",
      hooks: {},
    },
    {
      prefix: "/partidos",
      target:
        "https://eval2do-parcial-servicio-partidos.vercel.app/api/partidos",
      hooks: {},
    },
  ],
});

// Agrega CORS middleware
server.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes desde tu front-end
  })
);

server
  .start(PORT)
  .then((server) => {
    console.log("API Gateway running on port " + PORT);
  })
  .catch((error) => {
    console.error("Error starting API Gateway", error);
  });
