// Package Imports
import express from "express";

// User-Defined Module Imports
import dbMiddleWare from "./middlewares/db.middleware.js";
import routesMiddleWare from "./middlewares/routes.middleWare.js";

// Server Code
const app = express();
const port = process.env.PORT || 3000;

// MiddleWares
dbMiddleWare("mongodb://127.0.0.1:27017/inventory-management-app")
routesMiddleWare(app);

// Start Server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});




// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/", (req, res) => {
//   res.send("Got a POST request");
// });

// app.put("/user", (req, res) => {
//   res.send("Got a PUT request at /user");
// });

// app.delete("/user", (req, res) => {
//   res.send("Got a DELETE request at /user");
// });
