const mongoose = require('mongoose')
const Book = require('./book.model');


const postBook = async(req, res)=>{
    try{
     const newBook = await Book({...req.body})
     await newBook.save();
     res.status(200).send({message: "Book saved successfully", book:newBook})
    }catch(error){
     console.error('Error creating book', error)
     res.status(500).send({message: "Failed to create book"})
    }
} 

const getAllBooks = async(req, res)=>{
    try {
        const getBooks = await Book.find().sort({createdAt: -1});
        res.status(200).send(getBooks);
    } catch (error) {
        console.error('Error fetching book', error)
        res.status(500).send({message: "Failed to fetch book"})
    }
}

const getSingleBook = async(req, res)=>{
    try {
        const {id} = req.params;
        const getBook = await Book.findById(id);
        if(!getBook){
            return res.status(404).send({message: "Book not found"})
        }
        res.status(200).send(getBook);
    } catch (error) {
        console.error('Error fetching book', error);
        res.status(500).send({message: "Failed to fetch book"})
    }
}

const updateBook = async(req, res)=>{
    try{
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, {...req.body}, {new: true});
        if(!updatedBook){
            return res.status(404).send({message: "Book not found"})
        }
        res.status(200).send(updatedBook);
    } catch(error) {
        console.error('Error updating book', error)
        res.status(500).send({message: "Failed to update book"})
    }
}

const deleteBook = async(req, res) =>{
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).send({message: "Book not found"})
        }
        res.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        console.error('Error deleting book', error)
        res.status(500).send({message: "Failed to delete book"})
    }
}

module.exports = {
    postBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
}