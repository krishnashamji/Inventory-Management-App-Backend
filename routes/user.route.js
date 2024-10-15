import express from "express";
const router = express.Router();
import { loginUser, registerNewUser, getCurrentUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

// Routes
router.post("/login", loginUser);
router.post("/register", registerNewUser);
router.get("/me", auth, getCurrentUser)

export default router;
