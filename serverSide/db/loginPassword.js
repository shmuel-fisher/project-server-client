const {pool} =require('./db');


async function checkPassword(userId,password){
    const SQL = `
    SELECT * FROM passwords
    WHERE  passwords.userId=?  AND passwords.password = ?;
    `;
    const [[user]] =await pool.query(SQL , [  userId , password ]);
    if(user){
        return user;
    };
    // throw new Error();
}




module.exports={
    checkPassword
}