const express = require('express');
const app =express();
const cors= require('cors');
const { todosRouter } = require('./routes/todosRoutes');
const { loginRouter } = require('./routes/loginRoutes');
const { postsRouter } = require('./routes/postsRoute');
const { commentRouter } = require('./routes/commentsRoute');


app.use(express.json());
app.use(cors());


app.use('/api/todos' , todosRouter );


app.use('/api/login' ,  loginRouter);


app.use('/api/posts' , postsRouter);

app.use('/api/comments' , commentRouter);




app.listen(8900);
