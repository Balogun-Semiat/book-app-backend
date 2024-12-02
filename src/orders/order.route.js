const express = require('express');
const { createOrder, getOrdersByEmail } = require('./order.controller');
const router = express.Router()

//endpoint for order

router.post('/', createOrder);

router.get('/:email', getOrdersByEmail)



module.exports = router;