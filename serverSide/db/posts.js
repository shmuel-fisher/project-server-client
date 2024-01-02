const { pool } = require('./db');





async function getAllPosts() {
    const SQL = `SELECT * FROM posts;
    `;
    const [post] = await pool.query(SQL);
    console.log(post);
    return post;
}






async function getPost(id) {
    const SQL = `SELECT * FROM posts
    WHERE posts.id = ? ;
    `;
    const [post] = await pool.query(SQL, (id));
    console.log(post);
    return post;
}







async function getUserPosts(userId) {
    const SQL = `SELECT * FROM posts
    WHERE posts.userId = ? ;
    `;
    const [userPosts] = await pool.query(SQL, (userId));
    console.log(userPosts);
    return userPosts;
}





async function addPost(userId, title, body) {
    const SQL = `INSERT INTO posts(
        userId,
        title,
        body
    )
    VALUES(?, ?, ?);
    `;
    const [newPost] = await pool.query(SQL, ([
        userId,
        title,
        body
    ]));
    console.log(newPost);
    return newPost;
}






async function getSortPosts(sortBy) {
    const allowedColumns = ['title', 'body'];
    if (!allowedColumns.includes(sortBy)) {
        throw new Error('Invalid sortBy parameter');
    }
    const SQL = `SELECT * FROM posts
    ORDER BY ${sortBy};
    `;
    const [myPosts] = await pool.query(SQL, [sortBy]);
    console.log(myPosts);
    return myPosts;
}





async function setPost(id, title, body) {
    const SQL = ` UPDATE posts
    SET title = ? , body=? 
    WHERE posts.id=?;
    `;
    const [post] = await pool.query(SQL, [
        title,
        body,
        id
    ]);
    console.log(post);
    return post;
}





async function deletePosts(id) {
    const keepPost = getPost(id);
    const SQL = `DELETE FROM posts 
     WHERE posts.id = ?;
  `;

    const [post] = await pool.query(SQL, [id]);
    console.log(post);
    return keepPost;

}





module.exports = {
    getSortPosts,
    deletePosts,
    addPost,
    getUserPosts,
    getAllPosts,
    getPost,
    setPost
}