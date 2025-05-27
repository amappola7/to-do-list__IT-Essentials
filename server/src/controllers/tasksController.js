class TasksController {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }

    /**
     * @swagger
     * tags:
     *   name: Tasks
     *   description: API para gestionar tareas
     */

    /**
     * @swagger
     * /api/tasks:
     *   post:
     *     summary: Crea una nueva tarea
     *     tags: [Tasks]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - TaskName
     *               - Status
     *               - UserId
     *             properties:
     *               TaskName:
     *                 type: string
     *                 description: Nombre de la tarea
     *               Description:
     *                 type: string
     *                 description: Descripción de la tarea
     *               Status:
     *                 type: string
     *                 description: Estado de la tarea (por defecto 'Not Started')
     *               Priority:
     *                 type: integer
     *                 description: Prioridad de la tarea
     *               StartDate:
     *                 type: string
     *                 format: date-time
     *                 description: Fecha de inicio
     *               EstimatedDate:
     *                 type: string
     *                 format: date-time
     *                 description: Fecha estimada de finalización
     *               UserId:
     *                 type: integer
     *                 description: ID del usuario asignado
     *     responses:
     *       201:
     *         description: Tarea creada exitosamente
     *       500:
     *         description: Error interno del servidor
     */
    async createTask(req, res) {
        try {
            const task = await this.taskModel.create(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/tasks:
     *   get:
     *     summary: Obtiene todas las tareas
     *     tags: [Tasks]
     *     responses:
     *       200:
     *         description: Lista de tareas
     *       500:
     *         description: Error interno del servidor
     */
    async getTasks(req, res) {
        try {
            const tasks = await this.taskModel.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/tasks/{id}:
     *   get:
     *     summary: Obtiene una tarea por ID
     *     tags: [Tasks]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la tarea
     *     responses:
     *       200:
     *         description: Tarea encontrada
     *       404:
     *         description: Tarea no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    async getTaskById(req, res) {
        try {
            const task = await this.taskModel.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/tasks/{id}:
     *   put:
     *     summary: Actualiza una tarea por ID
     *     tags: [Tasks]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la tarea
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               TaskName:
     *                 type: string
     *               Description:
     *                 type: string
     *               Status:
     *                 type: string
     *               Priority:
     *                 type: integer
     *               StartDate:
     *                 type: string
     *                 format: date-time
     *               EstimatedDate:
     *                 type: string
     *                 format: date-time
     *               UserId:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Tarea actualizada
     *       404:
     *         description: Tarea no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    async updateTask(req, res) {
        try {
            const [updated] = await this.taskModel.update(req.body, {
                where: { TaskId: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'task not found' });
            }
            const updatedTask = await this.taskModel.findByPk(req.params.id);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /api/tasks/{id}:
     *   delete:
     *     summary: Elimina una tarea por ID
     *     tags: [Tasks]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la tarea
     *     responses:
     *       204:
     *         description: Tarea eliminada exitosamente
     *       404:
     *         description: Tarea no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    async deleteTask(req, res) {
        try {
            const result = await this.taskModel.destroy({
                where: { TaskId: req.params.id }
            });
            if (result === 0) {
                return res.status(404).json({ message: 'task not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TasksController;