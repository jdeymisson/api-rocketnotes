const AppError = require("../utils/AppError");

class UsersController {
    create(request, response) {
        const { nome, email } = request.body;
        if(!nome) {
            throw new AppError("Usuário precisa ser informado!");
        };
        response.status(201).json({ nome, email });
    };
};

module.exports = UsersController;