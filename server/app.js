const express =require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv=require("dotenv");
const employeeRoutes=require('./src/routes/routes')


const app= new express();
dotEnv.config();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend address
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use('/api/employee',employeeRoutes);


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
