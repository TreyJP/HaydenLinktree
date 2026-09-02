require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const {
  handleConfigGet,
  handleAdminConfigGet,
  handleConfigPut,
  handleLogin,
  handleLogout,
  handleMe,
} = require("./lib/handlers");

const app = express();
const PORT = process.env.PORT || 3456;

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.get("/api/config", (req, res) => handleConfigGet(req, res));
app.get("/api/admin/config", (req, res) => handleAdminConfigGet(req, res));
app.put("/api/config", (req, res) => handleConfigPut(req, res));
app.post("/api/auth/login", (req, res) => handleLogin(req, res));
app.post("/api/auth/logout", (req, res) => handleLogout(req, res));
app.get("/api/auth/me", (req, res) => handleMe(req, res));

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.listen(PORT, () => {
  console.log(`Hayden Linktree running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
