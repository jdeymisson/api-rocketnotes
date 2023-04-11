const fs = require("fs");
const path = require("path");
const  { UPLOADS_FOLDER, TMP_FOLDER }= require("../config/upload");

class DiskStorage {
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(TMP_FOLDER, file),
            path.resolve(UPLOADS_FOLDER, file)
        );
    };

    async deleteFile(file){
        const filePath =  path.resolve(UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        };

        await fs.promises.unlink(filePath);
    };
};

module.exports = DiskStorage;