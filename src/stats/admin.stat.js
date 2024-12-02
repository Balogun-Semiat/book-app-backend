const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Order = require('../orders/order.model');
const Book = require('../books/book.model');

router.get('/', async(req, res)=>{
    try {
        //to get total orders
        const totalOrders = await Order.countDocuments();
        console.log(totalOrders)

        // 2. Total sales: sum of the totalPrices from all orders
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: {
                        $sum: '$totalPrice'
                    }
                }
            }
        ])
        console.log(totalSales)

        // 3. Trending books statistics
        const trendingBooksCountResult = await Book.aggregate([
            { $match: { trending: true } },
            { $count: "trendingBooksCount" }
          ]);
          
          // Extract the count
          const trendingBooksCount = trendingBooksCountResult[0]?.trendingBooksCount || 0;
          
          console.log("Trending books count:", trendingBooksCount);

        //5. total number of books;
        const totalBooks = await Book.countDocuments();
        console.log(totalBooks)

        //6. total monthly sales;
        const monthlySales = await Order.aggregate([
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m', date: "$createdAt" } }, // group by year and month
                totalSales: { $sum: '$totalPrice' }, // sum total sales for each month
                totalOrders: { $sum: 1 } // count total orders for each month
              }
            },
            { $sort: { _id: 1 } } // sort by month
          ]);
          
          console.log("Monthly sales:", monthlySales);
          

        //Result Summary;
        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]? totalSales[0].totalSales : 0, //totoalsales[0]?.totalSales || 0
            trendingBooksCount,
            totalBooks,
            monthlySales
        })
    } catch (error) {
        console.error("Error fetching stats",error);
        res.status(400).json({message: 'Failed to fetch admin stats'})
    }
})

module.exports = router;


