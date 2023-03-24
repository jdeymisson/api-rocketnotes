const { Router } = require("express");

const usersRoutes = require("./users.routes");
const postsRoutes = require("./posts.routes");

const routes = Router();

const myMiddlewere = (request, response, next) => {
    const { isAdmin } = request.body;

    if(isAdmin !== true) {
        response.status(401).json({ "message": "Usuário não autorizado!" });
        return;
    };

    next();
};


routes.use("/users", myMiddlewere, usersRoutes);
routes.use("/posts", postsRoutes);

module.exports = routes;