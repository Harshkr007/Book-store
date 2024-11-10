import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["business", "fiction", "horror", "adventure"],
        required: true,
    },
    trending: {
        type: Boolean,
        default: true,
    },
    coverImage: {
        type: String,
        required: true,
        unique: true
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

export default Book;