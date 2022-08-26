const express = require("express")
const app = express()
const mongoose = require('mongoose')
const router = express.Router()
var cors = require('cors')
const Post = require("./model/Post");
const Acc = require("./model/Acc")

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
router.get('/get', (req, res) => {
    Post.find({})
    .then(data => res.json(data))
    .catch(error => res.status(500).send('Error'))
})

router.get('/getid', (req, res) => {
    Post.findOne({id: req.query.id})
    .then(data => {
       return res.json(data)
    })
    .catch(error => res.status(500).send('Error'))
})

router.post('/create', (req, res) => {
    const images = req.body.images;
    const title = req.body.title;

    try {
        if(!images) return res.send('Error')
      Post.create({ images, title });
    } catch (error) {
      return res.status(500).send('Error');
    }
    return res.status(201).send('Created ');
})

router.post('/delete', (req, res) => {
    Post.deleteOne({id: req.body.id}).then(() => res.status(200).send('deleted')).catch(error => res.status(500).send('Error'))
})

router.get('/get-acc', (req, res) => {
    Acc.find({})
    .then(data => res.json(data))
    .catch(error => res.status(500).send('Error'))
})

router.get('/get-acc-id', (req, res) => {
    Acc.findOne({idAcc: req.query.id})
    .then(data => {
       return res.json(data)
    })
    .catch(error => res.status(500).send('Error'))
})

router.post('/create-acc', (req, res) => {
    const images = req.body.images;
    const desc = req.body.desc;
    const thumb = req.body.thumb;
    const price = req.body.price;
    
    const finalImages = images.split(',')
    try {
        if(!images || !thumb) return res.send('Error')
      Acc.create({ images:finalImages, desc, thumb, price });
    } catch (error) {
      return res.status(500).send('Error');
    }
    return res.status(201).send('Created ');
})

router.post('/delete-acc', (req, res) => {
    Acc.deleteOne({idAcc: req.body.id}).then(() => res.status(200).send('deleted')).catch(error => res.status(500).send('Error'))
})


const connect = async () => {
    mongoose.connect('mongodb+srv://spidust:tranhaidang@cluster0.fi50fjo.mongodb.net/?retryWrites=true&w=majority')
    console.log('connected')
}


app.use('/', router)

connect()
app.listen(process.env.PORT || 5000, () => console.log('app is running, port:', process.env.PORT || 5000))