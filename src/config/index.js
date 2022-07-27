// este config en un escenario productivo
// debe ser mendiante variables de entorno

module.exports = {
  env: "development",
  port: 3001,
  host: "0.0.0.0",
  db_url: "mongodb://mongo-bd:27017",
  jwt_secret: "mi_secret",
  jwt_expire: "8h",
  jwt_issuer: "localhost",
};
