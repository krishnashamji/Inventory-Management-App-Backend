import express from "express";
const router = express.Router();
import * as uploadCSVController from '../controllers/uploadCSV.controller.js';
import auth from "../middleware/auth.middleware.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });


router.post('/uploadCSV', auth, upload.single('csvData'), uploadCSVController.uploadCSV)

export default router