const Order = require('./order.model');


const createOrder = async(req, res)=>{
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({message: "Failed to create order"})
    }
}

const getOrdersByEmail = async(req, res) =>{
    try{
        const {email} = req.params;
        const orders = await Order.find({email});
        if(!orders){
            res.status(400).json({message: 'No order found'})
        }
        res.status(200).json(orders);
    } catch(error){
        console.error("Error fetching order", error);
        res.status(500).json({message: "Failed to fetch order"})
    }
}

module.exports = {
    createOrder,
    getOrdersByEmail
}