const fs = require('fs');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
tour = require('../models/tour_model')
const url = "mongodb+srv://osamaeldemerdash57:uVl3wS6ruhA8FDYV@cluster0.kfaddh5.mongodb.net/"

mongoose.connect(url /*,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:true}*/)
  
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tour-simple.json`, 'utf-8'))
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tour1.json`, 'utf-8'))
// console.log(typeof tours)
// // IMPORT DATA INTO DB
const importData = async () => {
    try {
      await tour.create(tours);
      console.log('Data successfully loaded!');
      
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await tour.deleteMany();
      console.log('Data successfully deleted!');
      
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  // console.log(process.argv)

  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
}
  
