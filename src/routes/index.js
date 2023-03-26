const { Router } = require("express");

const usersRoutes = require("./users.routes");
const postsRoutes = require("./posts.routes");

const routes = Router();

routes.use("/users", usersRoutes);

module.exports = routes;