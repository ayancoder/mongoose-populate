const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const userRoute = require('./route/users');
const blogRoute = require('./route/blogs');
const commentRoute = require('./route/comments');

const app = express();
app.use(cors());
connectDB()

const PORT = process.env | 5000;
app.use(cors())
app.use(express.json({extended : false}));
app.get('/', (req, res)=> {
    res.send("welcome");
})

app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/comments', commentRoute);

app.listen(PORT, ()=> { console.log(`node started ${PORT}`)});