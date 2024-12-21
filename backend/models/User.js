const pool = require('../config/db'); // Import the database connection

// Function to find a user by provider and provider_id
async function findUserByProvider(provider, provider_id) {
    const [rows] = await pool.query(`
        SELECT users.* 
        FROM users u
        JOIN linked_accounts l
        ON u.user_no = l.user_no 
        WHERE l.provider = ? 
        AND l.provider_id = ?;
    `, [provider, provider_id]);
    return rows[0]; // Return the first user found
}

// Function to find a user by email
async function findUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

// Function to create a new user
async function createUser(user_name, email, user_picture) {
    const [result] = await pool.query(
        'INSERT INTO users (user_name, email, user_picture) VALUES (?, ?, ?)',
        [user_name, email, user_picture]
    );
    return result.user_no; // Return the new user's ID
}

// Function to link a provider to an existing user
async function linkProviderToUser(user_no, provider, provider_id) {
    await pool.execute(
        'INSERT INTO linked_accounts (user_no, provider, provider_id) VALUES (?, ?, ?)',
        [user_no, provider, provider_id]
    );
}

module.exports = {
    findUserByProvider,
    findUserByEmail,
    createUser,
    linkProviderToUser
};
