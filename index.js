const express = require('express');
const app = express();
const hbs = require('hbs');
require('dotenv').config()

const imageRouter = require('./src/routes/imageRoute');

app.set('view engine', 'hbs');

app.use('/api', imageRouter);
app.use('/uploads', express.static('uploads'));
app.use(express.static('views'));

app.get('/',(req, res)=>{
    res.render("index.hbs")
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})

module.exports = app;