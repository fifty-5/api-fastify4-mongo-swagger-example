module.exports = async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.code(401).send("token expired or invalid");
  }
};
