const AppError = require("../utils/AppError");
const sqliteConection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        
        if(checkUserExists) {
            throw new AppError("E-mail já esta em uso!");
        };

        if(name && email && password) {
            database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
            response.status(201).json({
                message: "Usuário cadastrado com sucesso!"
            });
        } else {
            throw new AppError("Verifique se todos os campos foram preenchidos!");
        };
    };
};

module.exports = UsersController;