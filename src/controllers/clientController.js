import * as clientService from "../services/clientServices.js"

export const getItems = async (req, res) => {
    try {
        const items = await clientService.getItems();
        res.status(200).json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const createItem = async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await clientService.createItem(itemData);
        res.status(200).json(newItem);
    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const itemData = req.body;
        const updatedItem = await clientService.updateItem(itemData, itemId);
        if (!updateItem) {
            return res.status(404).json({message: 'Item not found'});
        }
        return res.status(200).json(updatedItem);
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deleted = await clientService.deleteItem(itemId);
        if (!deleted) {
            return res.status(404).json({message: 'Item not found'});
        }
        return res.status(200).send();
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const searchItems = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const items = await clientService.searchItems(searchTerm);
        res.status(200).json(items);
    } catch (err) {
        console.error('Error searching items:', err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}