const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000
});

let tableCreated = false;

async function initDB() {
    if (tableCreated) return;
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name TEXT,
                email TEXT,
                project TEXT,
                message TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        tableCreated = true;
    } catch (err) {
        console.error('DB init error:', err);
    }
}

module.exports = { pool, initDB };
