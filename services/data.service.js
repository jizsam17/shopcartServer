const db = require('./db');

 const register=(name,email,password)=>{
      console.log('register called')

    return db.User.findOne({email}).then(user=>{
      console.log(user);
      if(user){
        return{
          status:false,
          statusCode:422,
          message:"User already exists!! Please Log in"
      }
      }
      else{
        const newUser = new db.User({
          name,
          email,
          password
        })
        newUser.save();
        return{
          status:true,
          statusCode:200,
          message:"Registration successful"
      }
      }
    })
  }


  const login=(req,email,password)=>{
    console.log(email)
    console.log(password)
    return db.User.findOne({
      email,
      password
    }).then(user=>{
      console.log(user)
      if(user){
        //req.session.currentUser=user.name
        //console.log("Current user:"+req.session.currentUser)
        return{
            status:true,
            statusCode:201,
            message:"Login successful",
             name:user.name,
            // acno:user.acno
        }
      }
      return{
        status:false,
        statusCode:423,
        message:"Invalid credentials"
    }
    })
  }

  const plants=()=>{
    console.log('plants called')
  
    return db.Plant.find().then(plant=>{
      return{
        status:true,
        statusCode:200,
        //message:"Registration successful",
        plant:plant
    }
    })
  }

  const addToCart=(req,name,price1)=>{
    console.log("addToCart service")
     var price=parseInt(price1)
     console.log(name)
     console.log(price)
     return db.Cart.find().then(cart=>{
      console.log(cart);
        const newItem = new db.Cart({
          name,
          price
        })
        console.log(newItem)
        newItem.save();
        return{
          status:true,
          statusCode:200,
          message:"Product added to cart"
      }
    })

  }

  const cartDisplay=()=>{
  
    return db.Cart.find().then(cart=>{
      return{
        status:true,
        statusCode:200,
        //message:"Registration successful",
        cart:cart
    }
    })
  }

  module.exports={
      register, login, plants, addToCart, cartDisplay
  }