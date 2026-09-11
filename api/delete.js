const { pool, initDB } = require('../db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    await initDB();

    if (req.method === 'DELETE' || (req.method === 'GET' && req.query && req.query.id && req.query.action === 'delete')) {
        try {
            const id = req.query.id;
            await pool.query('DELETE FROM messages WHERE id = $1', [parseInt(id)]);
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
