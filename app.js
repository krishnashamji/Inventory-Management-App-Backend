// Package Imports
import express from "express";

// Init database and routes
import initDB from "./utils/initdb.utils.js"
import initRoutes from "./utils/initRoutes.utils.js";

// Server Code
const app = express();
const port = process.env.PORT || 3000;

// MiddleWares
initDB("mongodb://127.0.0.1:27017/inventory-management-app")
initRoutes(app);

// Start Server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});


