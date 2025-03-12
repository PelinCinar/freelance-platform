require("dotenv").config(); 
const express = require("express"); 
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes.js")
const cookieParser = require('cookie-parser');

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes)

module.exports = app;
