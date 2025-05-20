import { query } from "../db.js";

export const getItems = async() => {
    const {rows} = await query('SELECT * FROM items_tb');
    return rows;
}

export const createItem = async(itemData) => {
    const { name, date, location, price } = itemData
    const {rows} = await query(
        `INSERT INTO items_tb (name, date, location, price)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, date, location, price]
    );
    return rows[0];
}

export const updateItem = async(itemData, itemId) => {
    const { name, date, location, price } = itemData
    const {rows} = await query(
        `UPDATE items_tb SET name = $1, date = $2, location = $3, price = $4
        WHERE id = $5 RETURNING *`,
        [name, date, location, price, itemId]
    );
    return rows[0];
}

export const deleteItem = async(itemId) => {
    const { rowCount } = await query(`DELETE FROM items_tb WHERE id = $1`, [itemId])
    return rowCount > 0;
}

export const searchItems = async(searchTerm) => {
    const {rows} = await query(
        'SELECT * FROM items_tb WHERE name ILIKE $1 OR location ILIKE $1',
        [`%${searchTerm}%`]
    );
    return rows;
}