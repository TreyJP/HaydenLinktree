const { handleMe } = require("../../lib/handlers");

module.exports = async (req, res) => {
  if (req.method === "GET") return handleMe(req, res);
  res.statusCode = 405;
  res.end("Method not allowed");
};
