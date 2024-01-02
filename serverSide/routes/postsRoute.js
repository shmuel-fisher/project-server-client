const express = require('express');
const postsRouter = express.Router();


const {
    getSortPosts,
    deletePosts,
    addPost,
    getUserPosts,
    getAllPosts,
    getPost,
    setPost
} = require('../db/posts');


postsRouter.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
});




postsRouter.get('/user/:userId', async (req, res) => {
    try {
        const userPost = await getUserPosts(req.params.userId);
        res.json(userPost);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
});




postsRouter.get('/post/:id', async (req, res) => {
    try {
        const post = await getPost(req.params.id);
        res.json(post);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
});



postsRouter.post('/add/:userId', async (req, res) => {
    try {
        const newPost = await addPost(req.params.userId, req.body.title, req.body.body);
        res.json(newPost);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
})



postsRouter.get('/sort/:sortBy', async (req, res) => {
    try {
        const posts = await getSortPosts(req.params.sortBy);
        res.json(posts);
    }
    catch (error) {
        console.log(error);
        res.statusMessage = error.message;
        res.status(500).send();
    }
})



postsRouter.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await deletePosts(req.params.id);
        res.json(deletedPost);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
})


postsRouter.put('/update/:id', async (req, res) => {
    try {
        const post = await setPost(req.params.id, req.body.title, req.body.body);
        res.json(post);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
}
)



module.exports = {
    postsRouter
}



