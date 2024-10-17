import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

// Routes
router.post("/login", userController.loginUser);
router.post("/register", userController.registerNewUser);
router.get("/me", auth, userController.getCurrentUser);

export default router;
 