import express from "express";
import Order from "../models/order.model.js";

const handleCreateOrder = async (req,res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        })
    } catch (error) {
        console.error("Error creating order",error);
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        })
    }
}

const handleGetOrdersByUser = async (req,res) => {
    try {
        const orders = await Order.find({email:req.params.userId}).sort({createdAt:-1});
        if(!orders){
            res.status(404).json({
                message: "Orders not found"
            })
        }
        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        })
    } catch (error) {
        console.error("Error fetching orders",error);
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        })
    }
}

export {
    handleCreateOrder,
    handleGetOrdersByUser,
}