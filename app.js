const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const http=require('http');
require('dotenv').config()
require("./views/cloudinary")
const urlencodedParser = bodyparser.urlencoded({ extended: false });
const cloudinary = require("cloudinary");
const upload = require('./views/multer');
app.set('view engine', 'ejs');
app.use('/assest', express.static('assest'));
app.use('/images', express.static('images'));
app.use('/apps', express.static('apps'));
app.use('/apps/auth',express.static('auth'));
app.use(bodyparser.json()).use(bodyparser.urlencoded({ extended: true }));
app.get('/', function (req, res) {

    res.render('index');
});
app.post('/upload',upload.single('image'),  async(req,res)=>{
    const result=  await cloudinary.v2.uploader.upload(req.file.path);
    res.send(`<h1>SUCCESFULLY UPLOADED !!!!</h1>`);
});
app.get('/contact', function (req, res) {

    res.render('contact', { qs: req.query });
});
app.post('/contact', urlencodedParser, function (req, res) {

    res.render('contact', { data: req.body });
});

app.listen(80);