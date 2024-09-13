const express =require('express');
const mongoose =require('mongoose');
const path = require("path");
const cors = require('cors');


const app= new express();

//dotenv
const dotEnv=require("dotenv");
dotEnv.config();

app.use(cors());
app.use(express.json());


//routes
app.use('/api/auth',authRoute);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err.toString());
  });



// app.use(express.static('client/dist'));
// // Add React Front End Routing
// app.get('*',function (req,res) {
//     res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
// })

module.exports=app;
