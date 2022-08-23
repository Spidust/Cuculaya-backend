const express = require("express")
const app = express()
const mongoose = require('mongoose')
const router = express.Router()
var cors = require('cors')
const Post = require("./model/Post");

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}

app.use(cors(corsOptions))

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

//routing 
router.get('/', (req, res) => res.send('hello routing'))
router.get('/get', (req, res) => {
    Post.find({})
    .then(data => res.json(data))
    .catch(error => {})
})
router.get('/getId', (req, res) => {
    Post.findOne({id: req.query.id})
    .then(data => res.json(data))
    .catch(error => {})
})
router.post('/create', (req, res) => {
    const images = req.body.images;
    const title = req.body.title;

    try {
      Post.create({ images, title });
    } catch (error) {
      return res.status(500).send('Error');
    }
    return res.status(201).send('Created');
})
router.post('/delete', (req, res) => {
    Post.deleteOne({id: req.body.id}).then(() => res.status(200).send('Delete')).catch(error => res.status(500))
})


const connect = async () => {
    mongoose.connect('mongodb+srv://spidust:tranhaidang@cluster0.fi50fjo.mongodb.net/?retryWrites=true&w=majority')
    console.log('connected')
}


app.use('/', router)

connect()
app.listen(3000, () => console.log('app is running'))