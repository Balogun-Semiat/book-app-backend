const express = require('express');
const User = require('./users.model');
const jwt = require('jsonwebtoken');
const verifyAdminToken = require('../middlewares/verifyAdminToken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post('/admin' , async(req, res)=>{
    const {userName, password} = req.body;
    try {
        const admin = await User.findOne({userName});
        if(!admin){
            return res.status(401).json({message: "Admin not foumd"})
        }
        if(admin.password !== password){
            return res.status(401).json({message: "Invalid password"})
        }

        const token = jwt.sign({
            id: admin._id,
            userName: admin.userName,
            role: admin.role
        }, JWT_SECRET, {expiresIn: '1h'})
        return res.status(200).json({message: "Authentication successful", token, user: {
            id: admin._id,
            userName: admin.userName,
            role: admin.role
        }})
    } catch (error) {
        
    }
})

module.exports = router