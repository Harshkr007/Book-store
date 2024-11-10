import express from "express";
import { handleBookCreate, handleDeleteBook, handleGetAlBooks, handleGetSingleBook, handleUpdateBook } from "../controllers/book.controller.js";
import verifyAdminToken from "../middleware/verifyAdminToken.middleware.js";

const router = express.Router();

//create a book
router.route("/create-book").post(verifyAdminToken,handleBookCreate)

//get all the books
router.get("/",handleGetAlBooks)

//get a single book
router.get("/get-single-book/:id",handleGetSingleBook)

//update the book
router.put("/edit/:id",verifyAdminToken, handleUpdateBook)

//delete the book
router.delete("/delete/:id", verifyAdminToken, handleDeleteBook)


export default router;