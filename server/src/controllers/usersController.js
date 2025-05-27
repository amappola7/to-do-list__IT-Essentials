class UsersController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Crea un nuevo usuario
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - Email
     *               - Password
     *               - Username
     *             properties:
     *               Email:
     *                 type: string
     *               Password:
     *                 type: string
     *               Username:
     *                 type: string
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     *       500:
     *         description: Error interno del servidor
     */
    async createUser(req, res) {
        try {
            const user = await this.userModel.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Obtiene todos los usuarios
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *       500:
     *         description: Error interno del servidor
     */
    async getUsers(req, res) {
        try {
            const users = await this.userModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Obtiene un usuario por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *       404:
     *         description: Usuario no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    async getUserById(req, res) {
        try {
            const user = await this.userModel.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     summary: Actualiza un usuario por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               Email:
     *                 type: string
     *               Password:
     *                 type: string
     *               Username:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuario actualizado
     *       404:
     *         description: Usuario no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    async updateUser(req, res) {
        try {
            const [updated] = await this.userModel.update(req.body, {
                where: { UserId: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'user not found' });
            }
            const updatedUser = await this.userModel.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     summary: Elimina un usuario por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del usuario
     *     responses:
     *       204:
     *         description: Usuario eliminado exitosamente
     *       404:
     *         description: Usuario no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    async deleteUser(req, res) {
        try {
            const result = await this.userModel.destroy({
                where: { UserId: req.params.id }
            });
            if (result === 0) {
                return res.status(404).json({ message: 'user not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UsersController;