import { Book } from "../models/book.model.js";


const handleBookCreate = async (req,res) => {
       try {
         const newBook = await Book.create(req.body);
         res.status(200).send({message:"Book posted successfully", book: newBook})
       } catch (error) {
        console.log("Error in book create: ",error)
            res.status(500).send({message:"Failed to create the book"})
       }
}
const handleGetAlBooks = async (req,res) => {
    try {
        const books = await Book.find({}).sort({createdAt:-1});
        res.status(200).send(books);
    } catch (error) {
        console.log("error in get all books: ",error);
        res.status(500).send({message:"Failed to fetch the books"});
    }
}

const handleGetSingleBook = async (req,res) => {
        try {
            const book = await Book.findById(req.params.id);
            if(!book){
                res.status(404).send({message: "Book is not found"})
            }
            res.status(200).send(book);
        } catch (error) {
            console.log("error in get single book : ",error);
            res.status(500).send({message:"Failed to get the Book"});
        }
}

const handleUpdateBook = async (req,res) => {
        try {
            const {id} = req.params;
            const updatedBook = await Book.findByIdAndUpdate(id,req.body,{
                new : true
            });
            if(!updatedBook){
                res.status(404).send({message :"Book not found"});
            }
            res.status(200).send({
                message : "Book updated successfully",
                book : updatedBook
            })
        } catch (error) {
            console.error("Error updating a book",error);
            res.status(500).send({message:"failed to update a book"});
        }
}

const handleDeleteBook = async (req,res) => {
    try {
        const{id} = req.params;
        const deleteBook = await Book.findByIdAndDelete(id);
        if(!deleteBook){
            res.status(404).send({message:"Book not found"});
        }
        res.status(200).send({
            message : "Book deleted sucessfully",
            book : deleteBook
        })

    } catch (error) {
        console.error("Error in book delete :: ",error);
        res.status(500).send({
            message : "failed to delete the book"
        })
    }
}

export {
    handleBookCreate,
    handleGetAlBooks,
    handleGetSingleBook,
    handleUpdateBook,
    handleDeleteBook,
}