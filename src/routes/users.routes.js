const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
    const { nome, email } = request.body;
    response.status(200).json({ nome, email });
});

module.exports = usersRoutes;