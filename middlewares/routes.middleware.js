import express from "express";
import cors from "cors";
import registerUser from '../routes/registerUser.route.js'
import loginUser from '../routes/loginUser.route.js'


function routesMiddleWare(app) {
    app.use(express.json())
    app.use(cors());
    app.use('/api/registerUser', registerUser)
    app.use('/api/loginUser', loginUser)
}

export default routesMiddleWare