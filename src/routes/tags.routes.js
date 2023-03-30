const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const myMiddlewere = (request, response, next) => {
    const { isAdmin } = request.body;

    if(isAdmin !== true) {
        response.status(401).json({ status: "error", message: "Usuário não autorizado!" });
        return;
    };

    next();
};

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;