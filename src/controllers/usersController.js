const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const checkUserExists = await knex("users").where({ email });

        if(checkUserExists.length) {
            throw new AppError("E-mail já esta em uso.");
        };

        const hashedPassword = await hash(password, 8);

        if(name && email && password) {
            await knex("users")
                .insert({ name, email, password: hashedPassword });
            return response.status(201).json({
                message: "Usuário cadastrado com sucesso!"
            });
        } else {
            throw new AppError("Verifique se todos os campos foram preenchidos.");
        };
    };

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;
        const user = await knex("users").where({ id }).first()  ;

        if(!user) {
            throw new AppError("Usuário não encontrado.");
        };

        const userWithUpdatedEmail = await knex("users").where({ email }).first();

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        };

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password) {
            throw new AppError("Você precisar informar a senha antiga para definir a nova senha.");
        };

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError("A senha antigan confere.");
            };

            user.password = await hash(password, 8);
        };

        await knex("users")
            .update({
                name: user.name,
                email: user.email,
                password: user.password })
            .where({ id });

        return response.json({message: "Usuário atualizado com sucesso."});
    };
};

module.exports = UsersController;