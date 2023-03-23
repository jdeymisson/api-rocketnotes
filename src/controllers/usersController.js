class UsersController {
    create(request, response) {
        const { nome, email } = request.body;
        
        response.status(200).json({ nome, email });
    };
};

module.exports = UsersController;