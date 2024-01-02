const {pool} = require('./db');



async function getAllComments(){
    const SQL =`SELECT * FROM comments;
    `;
    const [comment] = await pool.query(SQL);
    return comment;
}




async function getComment(id){
    const SQL =`SELECT * FROM comments
    WHERE comments.id = ? ;
    `;
    const [[comment]] = await pool.query(SQL , (id));
    return comment;
}





async function getUserComments(postId){
    const SQL =`SELECT * FROM comments
    WHERE comments.postId = ? ;
    `;
    const [userComments] = await pool.query(SQL , (postId));
    return userComments;
}







async function addComment(postId,name,email,body){
    const SQL =`INSERT INTO comments(
        postId,
        name,
        email,
        body
    )
    VALUES(?, ?, ?, ?);
    `;
    const [newComment] = await pool.query(SQL , ([
        postId,
        name,
        email,
        body
    ]));
    return newComment;
}






async function getSortComments(){
    const SQL =`SELECT * FROM comments
    ORDER BY name;
    `;
    const [myComments] = await pool.query(SQL);
    return myComments;
}




async function setComment(id,body){
    const SQL =` UPDATE comments
    SET body=? 
    WHERE comments.id=?;
    `;
    const [comment] = await pool.query(SQL, [
        body,
        id
    ]);
    return  comment;
}
    
 



async function deleteComments(id) {
  const keepComment =getComment(id);
    const SQL = `DELETE FROM comments 
     WHERE comments.id = ?;
  `;

    const [comment] = await pool.query(SQL, [id]);
    return keepComment;

}


module.exports ={
    getAllComments,
    getComment,
    getSortComments,
    getUserComments,
    deleteComments,
    setComment,
    addComment
}
