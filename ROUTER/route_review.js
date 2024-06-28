// const express = require("express");
// const review = require("../controler/review_cont")
// const user_control = require("./../controler/user");
// Ruter = express.Router({mergeParams:true});
// Ruter.route('/creteReview').post(user_control.protect,user_control.restrictto('user'),review.createReview)
// Ruter.route('/FindallReview').get(review.FindallReview)
// module.exports = Ruter;
const express = require("express");
const review = require("../controler/review_cont")
const user_control = require("./../controler/user");
Ruter = express.Router({mergeParams:true});
Ruter.route('/').post(user_control.protect, user_control.restrictto('user'), review.setidreview,review.createReview)
.get(review.FindallReview)
Ruter.route('/:id').delete(review.deletsreview).patch(review.updateonereview).get(review.FindoneReview)
module.exports = Ruter;
