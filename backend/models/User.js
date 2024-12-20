const db = require('../config/database');  // Import the database connection

// Function to find a user by Google ID
async function findUserByGoogleId(googleId) {
    const [rows] = await db.execute('SELECT * FROM users WHERE googleId = ?', [googleId]);
    return rows[0];  // Return the first user found
}

// Function to find a user by Facebook ID
async function findUserByFacebookId(facebookId) {
    const [rows] = await db.execute('SELECT * FROM users WHERE facebookId = ?', [facebookId]);
    return rows[0];
}

// Function to find a user by LINE ID
async function findUserByLineId(lineId) {
    const [rows] = await db.execute('SELECT * FROM users WHERE lineId = ?', [lineId]);
    return rows[0];
}

// Function to create a new user
async function createUser(userData) {
    const { googleId, facebookId, lineId, displayName, email, profileImage } = userData;
    const [result] = await db.execute(
        'INSERT INTO users (googleId, facebookId, lineId, displayName, email, profileImage) VALUES (?, ?, ?, ?, ?, ?)',
        [googleId, facebookId, lineId, displayName, email, profileImage]
    );
    return result.insertId;  // Return the newly created user's ID
}

module.exports = {
    findUserByGoogleId,
    findUserByFacebookId,
    findUserByLineId,
    createUser
};
