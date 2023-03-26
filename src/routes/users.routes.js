const { Router } = require("express");

const UsersController = require("../controllers/usersController");

const usersRoutes = Router();

const myMiddlewere = (request, response, next) => {
    const { isAdmin } = request.body;

    if(isAdmin !== true) {
        response.status(401).json({ status: "error", message: "Usuário não autorizado!" });
        return;
    };

    next();
};

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;