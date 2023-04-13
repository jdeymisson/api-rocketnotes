const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UsersAvatarController {
    async update(request, response) {
        const id_user = request.user.id;
        const avatarFileName = request.file.filename;
        const diskStorage = new DiskStorage;
        
        const user = await knex("users")
            .where({ id: id_user })
            .first();

      
        if(!user) {
            throw new AppError("Para alterar o avatar é necessário está autenticado.");
        };

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        };
        
        const filename  = await diskStorage.saveFile(avatarFileName);
        user.avatar = filename;

        await knex("users")
            .update(user)
            .where({ id: id_user });
        response.status(200).json(user);
    };
};

module.exports = UsersAvatarController;