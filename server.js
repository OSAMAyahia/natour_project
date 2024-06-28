const ss = require('./app');
const { MongoClient } = require('mongodb');
// importData = require('./DATA/import-dev-data');

const mongoose = require('mongoose');
const url = "mongodb+srv://osamaeldemerdash57:uVl3wS6ruhA8FDYV@cluster0.kfaddh5.mongodb.net/test"
// const urllocal="mongodb://localhost:27017"
// const urlllocal = "mongodb://localhost:27017/natours"
mongoose.connect(url /*, { /*useNewUrlparser:true,/*useCreateIndex:true useFindAndModify: false}*/ )
    /*.then((osa) => console.log(osa.connections))*/


// .then((con) => { console.log(con.connections);  console.log("okkkaaaay")})
// const client = new MongoClient(url)
// const main = async () => {
//     await client.connect()
//     const db = client.db("natours")
//     const collection = db.collection("tours")
//     const data = await collection.find().toArray()
// console.log(data)}
ss.listen(3001, () => { console.log(`app is running on port ${3001}`); }   )
// main()

