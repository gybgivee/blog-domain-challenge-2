const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// Add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tell express to use your routers here
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');


app.use('/users', userRouter);
app.use('/posts', postRouter);




module.exports = app
