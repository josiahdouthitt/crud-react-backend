import express from 'express';

import * as clientController from '../controllers/clientController.js';

const router = express.Router();

router.get('/items', clientController.getItems);
router.post('/items', clientController.createItem);
router.put('/items/:id', clientController.updateItem);
router.delete('/items/:id', clientController.deleteItem);
router.get('/items/search', clientController.searchItems);

export default router