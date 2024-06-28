const Review = require("../models/review_model")
const factory_fun = require("./factory-function");

// exports.createReview = async (req, res, next) => {
// if (!req.body.tour) req.body.tour=req.params.tourId
// if (!req.body.user) req.body.user=req.osama.id

//     const review = await Review.create(
//      { review: req.body.review,
//         rating: req.body.rating,
//         tour: req.body.tour,
//         user: req.body.user})

//     res.status(200).json({ review })
//  }

exports.setidreview = async (req, res, next) => {
    if (!req.body.tour) req.body.tour = req.params.tourId
    if (!req.body.user) req.body.user = req.osama.id
    next()
}

exports.createReview = factory_fun.create(Review)
exports.FindallReview = async (req, res, next) => {
    filter={ }
    if (req.params.tourId) filter ={tour:req.params.tourId}
    // const review = await Review.find({tour:filter})
    const review = await Review.find(filter)

    res.status(200).json({ review })
 }
// exports.FindoneReview = async (req, res, next) => {
//     const review = await Review.findById(req.params.id)

//     res.status(200).json({ review })
// }
exports.FindoneReview = factory_fun.getones(Review)
 
exports.deletsreview=factory_fun.deleteone(Review)
exports.updateonereview=factory_fun.update(Review)