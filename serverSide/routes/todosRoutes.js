const express = require('express');
const Joi = require('joi');



const { getCompleted,
    getTodosBy,
    getUserTodos,
    deleteTodos,
    addTodos,
    getTodos,
    getAllTodos,
    setTodos } = require('../db/todos');

const todosRouter = express.Router();








todosRouter.get('/', async (req, res) => {
    try {
        const getTodos = await getAllTodos();
        res.json(getTodos);
    }
    catch {
        console.log("shmulik is in mhelot");
        res.status(500).send();
    }
})




function handleId(req, res, next) {
    const schema = Joi.number().min(1);
    const { error } = schema.validate(req.params.id);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}



todosRouter.get('/:id', handleId, async (req, res) => {
    try {
        const todos = await getTodos(req.params.id);
        res.json(todos);
    }
    catch (error) {
        console.log(console.error(error));
        res.status(500).send();
    }
})



function handleUserId(req, res, next) {
    const schema = Joi.number().min(1);
    const { error } = schema.validate(req.params.userId);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}


todosRouter.get('/user/:userId', handleUserId, async (req, res) => {
    console.log("aaaa");
    try {
        const userTodos = await getUserTodos(req.params.userId);
        res.json(userTodos);
    }
    catch {
        console.log("shmulik is in mhelot");
        res.status(500).send();
    }
})



function handleNewTodos(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        completed: Joi.number().min(0).max(1).required()
    })
    const { error } = schema.validate( req.body );
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}




todosRouter.post('/add/:userId', handleNewTodos, handleUserId, async (req, res) => {
    try {
        const newTodos = await addTodos(req.params.userId, req.body.title, req.body.completed);
        if(newTodos.length)
        res.json(newTodos);
        else{res.status(404).send()}
    }
    catch {
        res.status(500).send();
    }
})




todosRouter.delete('/delete/:id', handleId, async (req, res) => {
    console.log("jeru");
    try {
        const deletedTodos = await deleteTodos(req.params.id);
        if (deletedTodos) {
            res.json(deletedTodos);
        }
        else {
            res.status(404).send("todos isn't found");
        }
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
})




todosRouter.get('/sort/title', async (req, res) => {
    try {
        const todos = await getTodosBy();
        res.json(todos);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
})


function handleBool(req, res, next) {
    const schema = Joi.number().min(0).max(1);
    const { error } = schema.validate(req.params.bool);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}


todosRouter.get('/completed/:bool', handleBool, async (req, res) => {
    try {
        const todos = await getCompleted(req.params.bool);
        console.log(todos);
        res.json(todos);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
});




todosRouter.put('/update/:id', async (req, res) => {
    try {
        const todo = await setTodos(req.params.id, req.body.title, req.body.completed);
        res.json(todo);
    }
    catch (error) {
        res.statusMessage = error.message;
        res.status(500).send();
    }
})





module.exports = {
    todosRouter
};