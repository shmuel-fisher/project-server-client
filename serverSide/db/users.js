const {pool} = require('./db')



async function getUser(id){
    const SQL = `
    SELECT * FROM users
    WHERE users.id = ?;
    `;
    const [user] =await pool.query(SQL , [id]);
    console.log(user);
   return user;
}




module.exports={
    getUser
}









