const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

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

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        response.status(200).json({ user, token });
    };
};

module.exports = SessionController;