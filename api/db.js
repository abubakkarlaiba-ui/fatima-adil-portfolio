const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function initDB() {
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
}

module.exports = { pool, initDB };
