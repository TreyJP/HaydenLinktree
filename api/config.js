const { handleConfigGet, handleConfigPut } = require("../../lib/handlers");

module.exports = async (req, res) => {
  if (req.method === "GET") return handleConfigGet(req, res);
  if (req.method === "PUT") return handleConfigPut(req, res);
  res.statusCode = 405;
  res.end("Method not allowed");
};
