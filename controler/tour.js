const fs = require("fs");
const factory_fun = require("./factory-function");
// const { query, request } = require("express");
const tour = require("../models/tour_model");
const async_handler=require("express-async-handler");
// const tours = JSON.parse(fs.readFileSync('./j.json'))
// exports.ceack = (req, res, next, val) => { console.log(`the id is are ${val}`); if (req.params.id * 1 > tours.length - 1) return res.status(404).json({ n: "errors" }); next()}
// exports.ceackbody = (req, res, next) => {
//     if (!req.body.price || !req.body.name) {
//     return res.status(404).json({ n: "errors" , message:" no id or name" })
// }next();}
// console.log(tours)
exports.aliastoptour = async_handler((req, res, next) => { 
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price"
    req.query.fields="name,price,summary,ratingsAverage,difficulty,startDates"
    next();
})

exports.getall = async_handler(async(req, res) => {/* console.log(s), */
    // try {
        //filtring
        const queryobject = { ...req.query }
        // const queryobjec = req.query.sort
        // console.log(queryobjec)
        const excludefields = ['page', 'sort', 'limit', 'fields']
        excludefields.forEach(e => delete queryobject[e]) // delete queryobject['page']

    
        // advanced filtering
        let querystr = JSON.stringify(queryobject)
        querystr=querystr.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`)
        console.log(JSON.parse(querystr))
        // console.log(JSON.stringify(querystr))
        // console.log(querystr)
        // querys = tour.find(queryobject)
        // querys = tour.find(JSON.parse(querystr))
        let query = tour.find(JSON.parse(querystr)) //دي الحاجات اللي راجعة من قاعدة البيانات
        // console.log("is"+sortby)
        if (req.query.sort) {
            let sortby=req.query.sort.split(',').join(' ')
            // query=query.sort(req.query.sort) //  عملت لها سورت وده يجوز لانها document
            query=query.sort(sortby) //  عملت لها سورت وده يجوز لانها document
        } else {
            query=query.sort("-startDates")
        }
        if (req.query.fields) {
            let fieldby = req.query.fields.split(',').join(' ')
            // query=query.sort(req.query.sort) //  عملت لها سورت وده يجوز لانها document
            query = query.select(fieldby) //  عملت لها سورت وده يجوز لانها document
        } else {
            query = query.select("-__v")
          
        }

        //pagination
        page = req.query.page * 1 ||1 
        limit= req.query.limit*1 ||100
        skip=(page-1)*limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const nemtour = await tour.countDocuments()
            console.log(nemtour)
            if(skip>=nemtour) throw new Error("this page is not found")
        }
        tours = await query
        res.status(200).json({ status: "sucess",Results:tours.length, data: { tour: tours }/* newtou:newtour*/ })
    })
    // catch(err){ res.status(404).json({ status: "fail", message: err }) }
// }
// exports.getone=async_handler(async(req, res) => {
//     // ids=req.params.id*1
//     // toursss=tours.find(e=>e.id ==req.params.id) ;
//     // if (req.params.id > tours.length - 1)
//     // if (!toursss) return res.status(404).json({ n: "errors" })
//     // res.status(200).json({ /*m: "osama", result: tours.length,*/ data: { toursss }
//     // })
//     // try {
//         // tours = await tour.findById(req.params.id)
//         //shothand=> 
//     tours = await tour.findOne({ _id: req.params.id }).populate('reviews')
        
//         res.status(200).json({ status: "sucess", data: { tour: tours }/* newtou:newtour*/ })
// })
exports.getone=factory_fun.getones(tour,{path:"reviews"})
    // catch (err) { res.status(500).json({ status: "fail", message: err }) }
// }
// exports.create = async_handler(async (req, res) => {
//     // try {
//         const newtourss = await tour.create(req.body)
//             ; res.status(201).json({ status: "sucess", data: { tour: newtourss }/* newtou:newtour*/ })
//     })
exports.create = factory_fun.create(tour)
    // catch (err) {
    //     res.status(404).json({ status: "fail", message: err })
        /*const newid = tours[tours.length-1].id+1
        const newtour = Object.assign({ id: newid }, req.body)
        tours.push(newtour);
        fs.writeFile('j.json', JSON.stringify(tours), (err, data) => { 
            res.status(201).json({ newtou:newtour })
        })*/
 
    // }
// }
// exports.updat = async_handler(async(req, res) => {
    
//     // try {
//         tours=await tour.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true});
//         res.status(200).json({ /*m: "osama", result: tours.length,*/ data: {tours}  })
        
//     // } catch (err) { res.status(404).json({status:"fail", message :err}) }
   
// })
exports.updat =factory_fun.update(tour)
// exports.deletes= async_handler(async(req, res) => {
//     // try {
//         await tour.findByIdAndDelete(req.params.id);
//         res.status(204).json({ /*m: "osama", result: tours.length,*/ data: null })
       
// } )
    // catch (err) {
    //     res.status(404).json({ status: "fail", message: err })
    // }
// }

exports.deletes=factory_fun.deleteone(tour)
