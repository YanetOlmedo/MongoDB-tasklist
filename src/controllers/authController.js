const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const createAccessToken = require("../libs/jwt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

//registro de usuarios
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json(["The email is already in use"]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const userData = await newUser.save();
    const token = await createAccessToken({ userId: userData._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userData._id,
      name: userData.name,
      email: userData.email,
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: error.message });
  }
};

// inicio de sesion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createAccessToken({ userId: existingUser._id });
    res.cookie("token", token);
    res.status(201).json({
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cerrar sesion
const logout = (_req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await userModel.findById(req.user.userId);
  if (!userFound) return res.status(401).json({ message: "User not found" });
  return res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
  });
};

// verificacion de token
const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await userModel.findById(user.userId);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.status(200).json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  });
};

module.exports = {
  login,
  logout,
  register,
  profile,
  verifyToken,
};
