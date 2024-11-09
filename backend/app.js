import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


//import routes
import bookRoute from "./src/routers/book.routes.js"
import orderRoutes from "./src/routers/order.routes.js"

const app = express();

// Combine middleware with reduced setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Fixed spelling and direct value
    credentials: true
}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public')); 



//routing
app.use("/api/books",bookRoute);
app.use("/api/orders",orderRoutes);




export default app;