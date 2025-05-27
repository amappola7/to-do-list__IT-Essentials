class ActionItemsController {
    constructor(actionItemModel) {
        this.actionItemModel = actionItemModel;
    }

    /**
     * @swagger
     * /api/action-items:
     *   post:
     *     summary: Crea un nuevo action item
     *     tags: [ActionItems]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - TaskId
     *             properties:
     *               TaskId:
     *                 type: integer
     *               Comment:
     *                 type: string
     *     responses:
     *       201:
     *         description: Action item creado exitosamente
     *       500:
     *         description: Error interno del servidor
     */
    async createActionItem(req, res) {
        try {
            const actionItem = await this.actionItemModel.create(req.body);
            res.status(201).json(actionItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/action-items:
     *   get:
     *     summary: Obtiene todos los action items
     *     tags: [ActionItems]
     *     responses:
     *       200:
     *         description: Lista de action items
     *       500:
     *         description: Error interno del servidor
     */
    async getActionItems(req, res) {
        try {
            const items = await this.actionItemModel.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/action-items/{id}:
     *   get:
     *     summary: Obtiene un action item por ID
     *     tags: [ActionItems]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del action item
     *     responses:
     *       200:
     *         description: Action item encontrado
     *       404:
     *         description: Action item no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    async getActionItemById(req, res) {
        try {
            const item = await this.actionItemModel.findByPk(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'action item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/action-items/{id}:
     *   put:
     *     summary: Actualiza un action item por ID
     *     tags: [ActionItems]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del action item
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               TaskId:
     *                 type: integer
     *               Comment:
     *                 type: string
     *     responses:
     *       200:
     *         description: Action item actualizado
     *       404:
     *         description: Action item no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    async updateActionItem(req, res) {
        try {
            const [updated] = await this.actionItemModel.update(req.body, {
                where: { ActionId: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'action item not found' });
            }
            const updatedItem = await this.actionItemModel.findByPk(req.params.id);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/action-items/{id}:
     *   delete:
     *     summary: Elimina un action item por ID
     *     tags: [ActionItems]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del action item
     *     responses:
     *       204:
     *         description: Action item eliminado exitosamente
     *       404:
     *         description: Action item no encontrado
     *       500:
     *         description: Error interno del servidor
     */
    async deleteActionItem(req, res) {
        try {
            const result = await this.actionItemModel.destroy({
                where: { ActionId: req.params.id }
            });
            if (result === 0) {
                return res.status(404).json({ message: 'action item not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ActionItemsController;