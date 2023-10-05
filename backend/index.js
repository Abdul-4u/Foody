const express = require('express')
const app = express()
const port = 5000
const mongoDb=require("./db");
mongoDb();

app.get('/', (req, res) => {
  res.send('Hello Aashu')
})

//middleware
app.use(express.json({extended:false}));
app.use('/api',require('./Routes/CreateUser'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})