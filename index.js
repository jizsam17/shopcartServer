const dataService = require('./services/data.service');
const express=require('express');
const session=require('express-session');
const { Session } = require('express-session');
const cors = require('cors')
//const {json} = require('express');


const app=express();

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

// const authMiddleware=(req,res,next)=>{
//         console.log("Current user:"+req.session.currentUser)
//         if(!req.session.currentUser){
//             return res.json({
//               status:false,
//               statusCode:425,
//               message:"Error!! Please Login"
//           })
//         }
//         else{
//             next()
//         }
//     }

// app.use(session({
//     secret:'randomSecretString',
//     resave:false,
//     saveUninitialized:false
// }))

const logMiddleware=(req,res,next)=>{
    //console.log(req.body);
    next()
}

app.use(logMiddleware)

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("GET Method");
})

app.post("/register",(req,res)=>{
    console.log("register");
    //console.log(req.body);
    dataService.register(req.body.name,req.body.email,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    //res.status(200).send("Success");
    //console.log(res.status(result.statusCode).json(result));
})

app.post("/login",(req,res)=>{
    console.log("login");
    console.log(req.body);
    dataService.login(req,req.body.email,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get("/plants",(req,res)=>{
    dataService.plants()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post("/addToCart",(req,res)=>{
    console.log("addToCart");
    dataService.addToCart(req,req.body.name,req.body.price)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get("/cart",(req,res)=>{
    dataService.cartDisplay()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(3000,()=>{
    console.log("Server started at 3000");
});

