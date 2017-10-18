const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb')
const url = 'mongodb://localhost:27017/library'

MongoClient.connect(url, function(err, db){
    if (err){
        console.log(err);
    }else {
      console.log('connect to MongoDB')      
    }
})


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json({type: 'application/x-www-form-urlencoded'}))

const library = require('./routers/library')

app.get('/', function(req, res){
    res.send('Hello... library !!')
})
app.use('/library', library)



app.listen(3000,()=>{
    console.log('listen port 3000')
})