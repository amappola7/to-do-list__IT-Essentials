const express = require('express');
const ActionItemsController = require('../controllers/actionItemsController');
const actionItemModel = require('../models/actionItemModel');

const router = express.Router();
const actionItemsController = new ActionItemsController(actionItemModel);

router.post('', actionItemsController.createActionItem.bind(actionItemsController));
router.get('', actionItemsController.getActionItems.bind(actionItemsController));
router.get('/:id', actionItemsController.getActionItemById.bind(actionItemsController));
router.put('/:id', actionItemsController.updateActionItem.bind(actionItemsController));
router.delete('/:id', actionItemsController.deleteActionItem.bind(actionItemsController));

module.exports = router;