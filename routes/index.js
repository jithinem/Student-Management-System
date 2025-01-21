const express = require("express");
const router = express.Router();

const userRoute = require("./user.route"); 
const taskRoute = require("./task.route"); 


const defaultRoutes = [
  {
    path: "/user",
    route: userRoute, 
  },
  {
    path: "/task",
    route: taskRoute, 
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route); 
});

module.exports = router; 