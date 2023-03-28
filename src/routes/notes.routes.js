const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

const myMiddlewere = (request, response, next) => {
    const { isAdmin } = request.body;

    if(isAdmin !== true) {
        response.status(401).json({ status: "error", message: "Usuário não autorizado!" });
        return;
    };

    next();
};

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);


module.exports = notesRoutes;