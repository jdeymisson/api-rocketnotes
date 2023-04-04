const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;
        const user = await knex("users") 
            .where({ email })
            .first();

        if(!user) {
            throw new AppError("E-mail e/ou senha incorreta.", 401);
        };

        const passwordMetched = await compare(password, user.password);

        if(!passwordMetched){
            throw new AppError("E-mail e/ou senha incorreta.", 401);
        };

        response.status(200).json(senhaMatch);
    };
};

module.exports = SessionController;