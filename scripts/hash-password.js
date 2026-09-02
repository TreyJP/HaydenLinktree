const { hashPassword } = require("../lib/auth");

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.js <your-password>");
  process.exit(1);
}

hashPassword(password).then((hash) => {
  console.log("\nAdd this to your .env file:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});
