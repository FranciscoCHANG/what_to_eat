const pool = require('../config/db'); // Import the database connection

// Function to find a user by provider and provider_id
async function findUserByProvider(provider, provider_id) {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM  linked_accounts l
            WHERE l.provider = ? 
            AND l.provider_id = ?;
        `, [provider, provider_id]);
        return rows[0]; // Return the first user found
    } catch (err) {
        console.error("Error querying database: ", err);
        throw err; // Rethrow the error or handle accordingly
    }
}

// Function to find a user by email
async function findUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

// Function to find a user by user_no
async function findUserById(user_no) {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_no = ?', [user_no]);
    return rows[0]; // 返回匹配的用戶
}

// Function to create a new user
async function createUser(user_name, email, user_picture) {
    const [result] = await pool.query(
        'INSERT INTO users (user_name, email, user_picture, create_at) VALUES (?, ?, ?, now())',
        [user_name, email, user_picture]
    );
    return result.insertId; // Return the new user's ID
}

// Function to link a provider to an existing user
async function linkProviderToUser(user_no, provider, provider_id) {
    await pool.query(
        'INSERT INTO linked_accounts (user_no, provider, provider_id, create_at) VALUES (?, ?, ?, now())',
        [user_no, provider, provider_id]
    );
}

module.exports = {
    findUserByProvider,
    findUserByEmail,
    findUserById,
    createUser,
    linkProviderToUser
};
