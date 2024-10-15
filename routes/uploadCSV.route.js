import express from "express";
const router = express.Router();
import uploadCSVController from '../controllers/uploadCSV.controller.js';
import auth from "../middleware/auth.middleware.js";

router.post('/uploadCSV', auth, uploadCSVController.uploadCSV)

export default router