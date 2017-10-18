const MongoClient = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const url = 'mongodb://localhost:27017/library'


// Find All Books
function findBookAll(req, res){
    MongoClient.connect(url, function(err, db){
        const colm = db.collection('Book')
        colm.find({}).toArray(function (err, docs){
            if(err){
                res.send(err)
                db.close();
            }else {
                res.send(docs)
                db.close();
            }
        })
    })
}

// Insert Book
function insertBook(req, res){
    // if (err) throw err;
    MongoClient.connect(url, function (err, db){
        const colm = db.collection('Book')
        colm.insertOne({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: parseInt(req.body.stock)
        })
        .then(function(row){
            res.send(row);
            db.close();
        })
    })
}

// Delete
function deleteBook(req,res){
    MongoClient.connect(url, function(err, db){
        const colm = db.collection('Book')
        colm.deleteOne({_id: ObjectId(`${req.params.id}`)})
        .then(function(row){
            res.send (row)
        })
        .catch(err =>{
            res.send(err)
        })
    })
}

// Update Book

function updateBook (req,res){
    MongoClient.connect(url, function(err, db){
        const colm = db.collection('Book')
        colm.updateOne({_id: ObjectId(`${req.params.id}`)},
        {
            $set: {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: parseInt(req.body.stock)
            }
        })
        .then(function (row){
            res.send(row)
        })
    })
}

module.exports = {
    findBookAll,
    insertBook,
    deleteBook,
    updateBook,

};
