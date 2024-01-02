const mysql = require('mysql2/promise');

let usersJson = null;
let todoJson = null;
let postsJson = null;
let albumsJson = null;
let commentsJson = null;
let photosJson = null;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678'
});

const createSchema = async () => {
    await pool.query('CREATE SCHEMA IF NOT EXISTS sqlData');
    await pool.query('USE sqlData');
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        username VARCHAR(50) ,
        website VARCHAR(50)
        )
        `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        title VARCHAR(255),
        body VARCHAR(255)    
        )
        `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS todo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        title VARCHAR(100),
        completed BOOLEAN
        )
        `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS photos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        albumId INT,
        title VARCHAR(100),
        url VARCHAR(100)
        )
        `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS albums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        title VARCHAR(100)
        )
        `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        postId INT,
        name VARCHAR(100),
        email VARCHAR(50),
        body VARCHAR(500)
        )
        `);
};

let dataBase = async () => {
    usersJson = await fetch("https://jsonplaceholder.typicode.com/users");
    usersJson = await usersJson.json();
    todoJson = await fetch("https://jsonplaceholder.typicode.com/todos");
    todoJson = await todoJson.json();
    postsJson = await fetch("https://jsonplaceholder.typicode.com/posts");
    postsJson = await postsJson.json();
    albumsJson = await fetch("https://jsonplaceholder.typicode.com/albums");
    albumsJson = await albumsJson.json();
    commentsJson = await fetch("https://jsonplaceholder.typicode.com/comments");
    commentsJson = await commentsJson.json();
    photosJson = await fetch("https://jsonplaceholder.typicode.com/photos");
    photosJson = await photosJson.json();

}

const updateTables = async () => {
    const connection = await pool.getConnection();
        for (const element of usersJson) {
            await connection.query(`
            INSERT INTO users (name, username, website) 
            VALUES (?, ?, ?);`, [element.name, element.username, element.website]);
        }
        for (const element of postsJson) {
            await connection.query(`
            INSERT INTO posts (userId, title, body) 
            VALUES (?, ?, ?);`, [element.userId, element.title, element.body]);
        }
        for (const element of todoJson) {
            await connection.query(`
            INSERT INTO todo (userId, title, completed) 
            VALUES (?, ?, ?);`, [element.userId, element.title, element.completed]);
        }
        for (const element of photosJson) {
            await connection.query(`
            INSERT INTO photos (albumId, title, url) 
            VALUES (?, ?, ?);`, [element.albumId, element.title, element.url]);
        }
        for (const element of commentsJson) {
            await connection.query(`
            INSERT INTO comments (postId, name, email, body) 
            VALUES (?, ?, ?, ?);`, [element.postId, element.name, element.email, element.body]);
        }
        for (const element of albumsJson) {
            await connection.query(`
            INSERT INTO albums (userId, title) 
            VALUES (?, ?);`, [element.userId, element.title]);
        }
    }
const insertTable = async () => {
        await createSchema();
        await dataBase();
        await updateTables();
        pool.end();
    }
    insertTable();
