const { pool, initDB } = require('../db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    await initDB();

    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [parseInt(id)]);
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
