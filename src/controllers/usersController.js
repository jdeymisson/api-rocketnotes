const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        
        if(checkUserExists) {
            throw new AppError("E-mail já esta em uso.");
        };

        const hashedPassword = await hash(password, 8);

        if(name && email && password) {
            database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
            response.status(201).json({
                message: "Usuário cadastrado com sucesso!"
            });
        } else {
            throw new AppError("Verifique se todos os campos foram preenchidos.");
        };
    };

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;
        const database = await sqliteConection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado.");
        };

        const userWithUpdatedEmail =  await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        };

        user.name = name ?? user.name
        user.email = email ?? user.email

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


        await database.run(`
            UPDATE users SET
            name = ?, 
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]);
        
        response.json({message: "Usuário atualizado com sucesso."});
    };
};

module.exports = UsersController;