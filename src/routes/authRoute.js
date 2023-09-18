const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  login,
  logout,
  register,
  profile,
  verifyToken,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/verify", verifyToken);
router.get("/profile", authMiddleware, profile);

module.exports = router;
