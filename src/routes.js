const express = require("express");
const middleware = require("./middleware/auth");
const userController = require("./controllers/userController");
const moduleController = require("./controllers/moduleController");
const classController = require("./controllers/classController");
const routes = express.Router();

routes.post("/login", userController.auth);
routes.post("/module", moduleController.create);
routes.get("/modules", moduleController.getModules);
routes.get("/module/:id", middleware, moduleController.getModule);
routes.patch("/module/:id", middleware, moduleController.updateModule);
routes.delete("/module/:id", middleware, moduleController.remove);
routes.post("/class/:id", classController.create);
routes.get("/classes/:id", middleware, classController.getClasses);
routes.delete("/class/:id", middleware, classController.remove);
routes.get("/class/:id", middleware, classController.getClass);
routes.patch("/class/:id", middleware, classController.update);
routes.get("/totalClasses", classController.getTotal);


module.exports = routes;