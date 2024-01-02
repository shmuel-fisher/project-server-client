const express = require('express');
const Joi = require('joi');

const { getUser } = require('../db/users');
const { checkPassword } = require('../db/loginPassword');

const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const user = await checkPassword(req.body.userId, req.body.password);
        // console.log(user);
        if(user){
            const details = await getUser(req.body.userId);
            res.json(details);
    }
    res.status(404).send();
}
    catch (error) {
         res.statusMessage=error.message;
          console.log(error);
         res.status(500).send("the user isn't exsist");
    }
});




module.exports = {
    loginRouter
}





