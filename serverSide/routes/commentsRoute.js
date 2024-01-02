const express = require('express');
commentRouter = express.Router();


const {
    getAllComments,
    getComment,
    getSortComments,
    getUserComments,
    deleteComments,
    setComment,
    addComment
} = require('../db/comments');



commentRouter.get('/', async (req, res) => {
    try {
        const comment = await getAllComments();
        return comment;
    }
    catch (error) {
        res.statusMessage = error.message
        res.status(500).send();
    }
})


commentRouter.get( '/sort' ,async(req,res) =>{
    console.log("sort");
     try {
         const comments = await getSortComments();
         res.json(comments);
     }
     catch (error) {
         res.statusMessage = error.message
         res.status(500).send();
     }
 })



commentRouter.get('/:postId', async (req, res) => {
    try {
        const comment = await getUserComments(req.params.postId);
        res.json(comment);
    }
    catch (error) {
        res.statusMessage = error.message
        res.status(500).send();
    }
})



commentRouter.put('/update/:id', async (req, res) => {
    try {
        const [comment] = await setComment(req.params.id, req.body.body);
        res.json(comment);
    }
    catch (error) {
        res.statusMessage = error.message
        res.status(500).send();
    }
})


commentRouter.delete('/delete/:id', async (req, res) => {
    try {
        const deletedComment = deleteComments(req.params.id);
        res.json(deletedComment);
    }
    catch (error) {
        res.statusMessage = error.message
        res.status(500).send();
    }
});



commentRouter.post('/add/:postId' , async(req,res) =>{
    try {
        const newComment = addComment(req.params.postId, 
            req.body.name, 
            req.body.email, 
            req.body.body
            );
        res.json(newComment);
    }
    catch (error) {
        res.statusMessage = error.message
        res.status(500).send();
    }
});




module.exports = {
    commentRouter
}