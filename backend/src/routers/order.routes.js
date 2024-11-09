import express from "express";
import { handleCreateOrder, handleGetOrdersByUser } from "../controllers/order.controller.js";

const Router = express.Router();

//create order endpoints
Router.post("/create", handleCreateOrder)

//get orders by user email
Router.get("/email/:userId", handleGetOrdersByUser)

export default Router;