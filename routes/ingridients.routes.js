const express = require ('express');
const db = require('../db');
const router = express.Router();



router.get('/', async (req, res) => {
    const ingridients = await db.query('SELECT * FROM ingridient;');
    res.json(ingridients.rows);
});

module.exports = router;