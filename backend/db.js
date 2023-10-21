// const mongoose = require('mongoose');
// const mongoURI='mongodb+srv://Foody:abdul123@cluster0.arrsnrx.mongodb.net/?retryWrites=true&w=majority'
// const mongoDb=async()=>{ 

// await mongoose.connect(mongoURI,{useNewUrlParser: true},(err,result)=>{
//   if(err){
//     console.log("gadbad hai");
//   }
//   else{

//     console.log('successfully connected');
//   }
// });
// }
// module.exports=mongoDb;
const mongoose = require("mongoose");
const colors = require("colors");

const mongoDb = async () => {

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb+srv://Foody:abdul123@cluster0.arrsnrx.mongodb.net/Foody?retryWrites=true&w=majority');

    console.log(`
      Connected To DATABASE(Sab changa si!) ${mongoose.connection.host}`.bgCyan.white
    );
    //Now the data base is connected and we are fetching the data from mondoDB
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {

      const food_category = await mongoose.connection.db.collection("food_category");

      food_category.find({}).toArray(function (err, catData) {

        if (err) console.log(err);
        else {
          global.food_items = data;
          global.food_category = catData;

        }

      })

    })

  } catch (error) {
    console.log(`error in connection (Kuch to gaadbad hai!) ${error}`.bgRed.white);
  }
};

module.exports = mongoDb;