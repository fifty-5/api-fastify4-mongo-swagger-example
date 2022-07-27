const Fastify = require("fastify");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./config");

const fastify = Fastify({
  logger: true,
});

// habilitamos jwt
fastify.register(require("@fastify/jwt"), {
  secret: config.jwt_secret,
  sign: {
    expiresIn: config.jwt_expire,
    issuer: config.jwt_issuer,
  },
  verify: {
    issuer: config.jwt_issuer,
  },
});

// habilitamos cors
fastify.register(require("@fastify/cors"), {
  origin: function (origin, cb) {
    // por el momento todas las peticiones pasan
    // en un escenario productivo esto debe controlarse
    if (config.env === "development") {
      return cb(null, true);
    }

    // Error access
    cb(new Error(`Not allowed for ${origin}`));
  },
});

(async function () {
  try {
    await mongoose.connect(config.db_url, {
      autoIndex: config.env === "development" ? true : false,
    });
  } catch (error) {
    fastify.log.error("Error to connect mongodb: ", error);
    process.exit(1);
  }

  // es necesario esperar el callback de swagger
  await fastify.register(require("@fastify/swagger"), {
    routePrefix: "/swagger",
    swagger: {
      info: {
        title: "Test API - Fastify, Mongo, Docker, Swagger",
        description: "Fastify swagger API",
        version: "0.1.0",
      },
      host: `${config.host}:${config.port}`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      definitions: {
        User: {
          type: "object",
          required: ["email", "firstname", "lastname"],
          properties: {
            _id: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            email: { type: "string", format: "email" },
            created_at: { type: "Date" },
            updated_at: { type: "Date" },
          },
        },
        Product: {
          type: "object",
          required: ["title", "user_id"],
          properties: {
            _id: { type: "string" },
            code: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            quantity: { type: "number" },
            user_id: { type: "string" },
          },
        },
      },
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    exposeRoute: true,
  });

  // arma rutas posterior a cargar swaggar
  routes.forEach((route) => {
    fastify.route(route);
  });

  fastify.listen({ port: config.port, host: config.host }, function (err, _) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
})();
