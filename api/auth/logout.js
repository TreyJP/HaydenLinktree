const { handleLogout } = require("../../lib/handlers");

module.exports = async (req, res) => {
  if (req.method === "POST") return handleLogout(req, res);
  res.statusCode = 405;
  res.end("Method not allowed");
};
