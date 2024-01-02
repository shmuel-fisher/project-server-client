
const { pool } = require('./db');
require('dotenv').config();






async function getUserTodos(userId) {
    const SQL = `SELECT * FROM todos
WHERE todos.userId = ?;
`;
    const [userTodos] = await pool.query(SQL, [userId]);
    console.log(userTodos);
    return userTodos;
}


async function getAllTodos() {
    const SQL = `SELECT * FROM todos;
`;
    const [todos] = await pool.query(SQL);
    console.log(todos);
    return todos;

}






async function getTodos(id) {
    const SQL = `SELECT * FROM todos
WHERE todos.id = ?;
`;
    const [todos] = await pool.query(SQL, [id]);
    console.log(todos);
    return todos;

}



async function getTodosBy() {
    const SQL = `SELECT * FROM todos
        ORDER BY title ;
`;
    const [sortTodos] = await pool.query(SQL);
    console.log(sortTodos);
    return sortTodos;

}






async function addTodos(userId, title, completed) {
    const SQL = `INSERT INTO todos(
        userId,
        title,
        completed
    )
    VALUES(?, ?, ?)
    `;
    const [newTodos] = await pool.query(SQL, ([
        userId,
        title,
        completed
    ]));
    console.log(newTodos);
    return newTodos;
}







async function getCompleted(bool) {
    const SQL = `SELECT * FROM todos
    WHERE todos.completed = ?
    `;
    const [userTodos] = await pool.query(SQL, [bool]);
    console.log(userTodos);
    return userTodos;
}








async function deleteTodos(id) {
    const keepTodos = getTodos(id);
    const SQL = `DELETE FROM todos 
     WHERE todos.id = ?;
  `;

    const [todos] = await pool.query(SQL, [id]);
    console.log(todos);
    if (todos.affectedRows === 1) {
        return keepTodos;
    }
}




async function setTodos(id, title, completed) {
    const SQL = `UPDATE todos 
    SET todos.title = ? ,todos.completed = ?
    WHERE todos.id = ?; 
    `;
    const [todo] = await pool.query(SQL, [
        title,
        completed,
        id
    ]);
    return todo;
}


module.exports = {
    getCompleted,
    getTodos,
    getTodosBy,
    getUserTodos,
    deleteTodos,
    addTodos,
    getAllTodos,
    setTodos
};