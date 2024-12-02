 const express = require('express');
 const app = express();
 const port = process.env.port || 5000;

 const mongoose = require('mongoose');
 require('dotenv').config()
 const bookRoute = require('./src/books/book.route');
 const orderRoute = require('./src/orders/order.route')
 const userRoute = require('./src/users/user.route')
 const adminRoute = require('./src/stats/admin.stat')
 const cors = require('cors');

//  app.use(express.json());
 app.use(cors({
    origin:['http://localhost:5173', "https://book-app-frontend-sooty.vercel.app"],   // allow requests from this origin
    credentials: true, // allow cookies
  // methods: ['GET', 'POST', 'PUT', 'DELETE'] // allow these methods
 }));
 app.use(express.json({extended: "true", limit: "200mb"}))
 app.use(express.urlencoded({extended: "true", limit: "200mb"}))
 app.use('/api/books', bookRoute)
 app.use('/api/orders', orderRoute)
 app.use('/api/auth', userRoute)
 app.use('/api/admin', adminRoute)

 

// app.get('/', (req, res)=>{
//     res.send('Hello World!')
 
// })


async function main(){
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res)=>{
    res.send('Welcome hii!')
})

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().then(()=>console.log('connected to mongodb sucessfully')).catch(err => console.log(err));



 app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
 })