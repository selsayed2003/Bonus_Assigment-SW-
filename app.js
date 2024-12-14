const express = require('express')
const app = express()

const {books} =require('./data.js')

app.use(express.json())  // this is middleware to get json data
app.post('/add_book', (req, res) =>{
    const{title, author, publishedYear, isbn, genre} = req.body
    
    if(!title || !author || !publishedYear || !isbn ||!genre){
        return res.status(400).json("data is not exists")
    }
    else{
        const new_book = {id : (books.lenght)+1, title, author, publishedYear, isbn, genre}
        books.push(new_book)
        res.status(200).json("book is added successfully")
    }
})

app.get('/list', (req, res) =>{
    res.send(books)
})

app.get('/search', (req, res) =>{
    const {title} = req.body
    const result = books.find((book) => book.title == title)
    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(404).json("not exists")
    }
})

app.delete('/delete', (req, res) =>{
    const {isbn} = req.query
    const result_index = books.findIndex((book) => book.isbn === String(isbn))
    if (result_index === -1){
        res.status(404).json("there is not book with this isbn")
    }
    else{
        const deleted_book = books.splice(result_index, 1)
        res.status(200).json("the book is deleted successfully")
    }
})


app.put('/update', (req, res) => {
    const { isbn } = req.query;
    const{title, author, publishedYear, id, genre} = req.body
    const result_book = books.find(book => book.isbn === String(isbn));

    if (!result_book) {
        return res.status(404).json("there is not book with this isbn");
    }
    else{
        if(title){
            result_book.title = title
        }
        if(author){
            result_book.author = author
        }
        if(publishedYear){
            result_book.publishedYear = publishedYear
        }
        if(isbn){
            result_book.isbn = id
        }
        if(genre){
            result_book.genre = genre
        }
        res.status(200).json("the book is updated successfully")
    }
});
app.listen(5000)