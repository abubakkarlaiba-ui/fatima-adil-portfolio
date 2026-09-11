const { pool, initDB } = require('./db');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    await initDB();

    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
            return res.status(200).json(result.rows);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const { name, email, project, message, deleteId } = body;

            if (deleteId) {
                await pool.query('DELETE FROM messages WHERE id = $1', [parseInt(deleteId)]);
                return res.status(200).json({ success: true });
            }

            const result = await pool.query(
                'INSERT INTO messages (name, email, project, message) VALUES ($1, $2, $3, $4) RETURNING *',
                [name || '', email || '', project || '', message || '']
            );
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
