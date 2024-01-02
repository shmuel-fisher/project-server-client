const express= require('express');


const userRoute =express.Router();

userRoute.get('/' , async (req,res) => {
    res.json({name: "ben"})
} )
userRoute.get('/banana' , async (req,res) => {
    res.json({name: "banana"})
} )

module.exports = userRoute;











































































