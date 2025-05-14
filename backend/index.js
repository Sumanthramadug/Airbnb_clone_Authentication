const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const PORT=process.env.PORT;
const mongoose=require('./Config/mongodb');
var cors=require('cors');
const allowedOrigins = ['https://airbnb-clone-authentication-2.onrender.com','http://127.0.0.1:3000']
app.use(express.json());
app.use(cors({origin: allowedOrigins,credentials:true}))

app.use("/users",require('./Controllers/authController'));


app.get("/",(req,res)=>{
    res.send("Hello World");
});


app.listen(PORT,()=>{
    console.log(`Server is Listening On Port:${PORT}`)
})
