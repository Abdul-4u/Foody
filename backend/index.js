const express = require('express')
const app = express()
const port = 5000
const mongoDb=require("./db");
mongoDb();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})



//middleware
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));

app.get('/', (req, res) => {
  res.send('Hello Aashu')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})