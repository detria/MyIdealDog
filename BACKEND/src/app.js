const express=require('express')
const morgan=require('morgan')
const mongoose= require('mongoose')
const cors=require('cors')
const jwt = require('jsonwebtoken');

//CONEXIÓN A LA BASE DE DATOS
mongoose.connect( "mongodb+srv://m001-student:-Brusybruk2001@cluster0.kxuxe.mongodb.net/MyIdealDogDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() =>{
    console.log('DB CONNECTED');
  }
);

const port = process.env.PORT || 3000;

const app=express()

app.use(cors({origin:"http://localhost:4200"}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',require('./routes/userRoutes.js'))
app.use('/dog',require('./routes/dogRoutes.js'))
app.use('/comment',require('./routes/commentRoutes.js'))

app.listen(port)
console.log('Server on port ',port)


