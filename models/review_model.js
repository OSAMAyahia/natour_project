 mongoose = require("mongoose");

 const reviewSchema = new mongoose.Schema({
     review: {
         type: String, // تصحيح "typeof" إلى "type"
         required: [true, "Review cannot be empty!"]
     },
     rating: {
         type: Number, // تصحيح "this" إلى "type"
         min: 1,
         max: 5
     },
     createdAt: {
         type: Date, // تصحيح "this" إلى "type"
         default: Date.now
     },
     tour: {
         type: mongoose.Schema.ObjectId,
         ref: 'tours', // تعديل الاسم للتوافق مع تسمية المرجع
         required: [true, 'Review must belong to a tour']
     },
     user: {
         type: mongoose.Schema.ObjectId,
         ref: 'user_tour', // تعديل الاسم للتوافق مع تسمية المرجع
         required: [true, 'Review must belong to a user']
     }
 }, {
     toJSON: { virtuals: true },
     toObject: { virtuals: true }
 });
 reviewSchema.pre(/^find/, function (next) { 
    this.populate({
        path: 'tour',
        select: 'name'
    }).populate({
        path: 'user',
        select: 'name photo '
    });
    next();
  })

 const Review = mongoose.model('Review', reviewSchema);
 
 module.exports = Review;
 
