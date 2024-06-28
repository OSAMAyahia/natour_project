const express = require("express");
const tourcontrol = require("./../controler/tour");
const useroth = require("../controler/user");
const review = require("../controler/review_cont")
const user_control=require("../controler/user");
const routerRview = require("./route_review")

const Ruter = express.Router();
// Ruter .param('id',tourcontrol.ceack)
// Ruter.param('id', (req, res, next, val) => {
//     console.log(`the id is${val}`)
//     next()
// })
Ruter.route('/cheap_5_top').get(tourcontrol.aliastoptour,tourcontrol.getall)
Ruter.route('/').get(tourcontrol.getall).post(/*tourcontrol.ceackbody*/tourcontrol.create)
Ruter.route('/:id').get(tourcontrol.getone).patch(tourcontrol.updat).delete( useroth.protect,useroth.restrictto('admin','lead-guide'),tourcontrol.deletes) 
// Ruter.route('/:tourId/reviews').post(user_control.protect,user_control.restrictto('user'),review.createReview)
Ruter.use('/:tourId/reviews',routerRview)

// Ruter.route('/:tourId/reviews').get(review.FindoneReview)



module.exports = Ruter;