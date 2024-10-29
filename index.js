const express = require("express");
const gateway = require("fast-gateway");
const cors = require("cors");

const PORT = process.env.PORT || 3500;
const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware para manejar OPTIONS
server.options("*", cors());

const apiGateway = gateway({
  server: server,
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

apiGateway
  .start(PORT)
  .then(() => {
    console.log("API Gateway running on port " + PORT);
  })
  .catch((error) => {
    console.error("Error starting API Gateway", error);
  });
