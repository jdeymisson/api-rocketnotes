const { Router } = require("express");

const postsRoutes = Router();

postsRoutes.post("/", (request, response) => {
    const { nome, email } = request.body;
    response.status(200).json({ nome, email });
});

module.exports = postsRoutes;