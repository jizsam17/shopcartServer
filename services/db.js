const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Shop_Cart",{useNewUrlParser:true,useUnifiedTopology:true})
console.log("connected")

const User = mongoose.model("User",{
    name:String,
    email:String,
    password:String
})

const Plant = mongoose.model("Plant",{
    name:String,
    price:Number
})

const Cart = mongoose.model("Cart",{
    name:String,
    price:Number
})

module.exports={
    User, Plant, Cart
}