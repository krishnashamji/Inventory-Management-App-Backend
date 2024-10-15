// Package Imports
import express from "express";

// Init database and routes
import initDB from "./utils/initdb.utils.js"
import initRoutes from "./utils/initRoutes.utils.js";

// Server Code
const app = express();

// MiddleWares
initDB("mongodb://127.0.0.1:27017/inventory-management-app")
initRoutes(app);

// Start Server
const port = process.env.PORT || 3000; // Environment vairable

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});


// app.js
    // initDatabase (data access layer): data access layer medates database layer interaction (mongoose). All connections, creations (schema, models, document saving) and querying is communicated in this layer.
    // models (data access layer): database that stores the user's data (username, hashed password, etc.). | validation also happens in the database schema level before it's commited to the database 
    // mongoose (database layer): physically stores data and manages its structure, access, and integrity. 
    // initRoutes (service layer): middleware layer request processing pipline. Middleware connects and processes incoming requests sequentially.
        // routeing layer: routing layer that defines the routes for handling user requests for CRUD operations
            // controllers layer(handlers, networking): functions that handle specific routes| validation happens on the handler level
                // service logic (business logic layer):
                // utils (business logic layer): a sub layer that helps controllers/handlers do specific utility functions such as checking if the username is already taken, validating the password, etc. 


// Config folder contains the applications settings, values that affect how a computer's processes behave
    // default.json contains default values 
    // custom-environment-variables maps the setting ""jwtPrivateKey":" to an environment variable 