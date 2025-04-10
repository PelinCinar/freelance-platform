require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swaggerConfig.js");
const corsOptions = require("./src/config/corsConfig.js");
const { logEventsMiddleware } = require("./src/middlewares/logEventsMiddleware.js");
const errorHandler = require("./src/middlewares/errorHandler.js");
const userRoutes = require("./src/routes/userRoutes.js");  
const projectRoutes = require("./src/routes/projectRoutes.js");  
const bidRoutes = require("./src/routes/bidRoutes.js");  
const chatRoutes = require("./src/routes/chatRoutes.js");  
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(logEventsMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/projects", projectRoutes); 
app.use("/api/bids", bidRoutes); 
app.use('/api/chat', chatRoutes);

// Swagger dokümantasyonu
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
