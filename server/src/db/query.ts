import { User } from "../types/user"
import pool from "./pool"

const createUserTable = async () => {
    // TODO: Change length of 'id' specific to socket id
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL
    )`)
}

const removeUserQuery = async (userId: string) => {
    await pool.query(
        `DELETE FROM users WHERE id = $1`, 
        [userId]
    )
}

const addUserQuery = async (user: User) => {
    await pool.query(
        'INSERT INTO users (id, username) VALUES ($1, $2)', 
        [user.id, user.username]
    );
}

const getUserQuery = async (username: string) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
    );

    const user: User[] = result.rows;
    return user[0];
}

export {
    createUserTable,
    removeUserQuery,
    addUserQuery,
    getUserQuery
};
