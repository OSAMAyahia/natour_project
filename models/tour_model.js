const mongoose = require('mongoose');
const { types } = require('util');

// تعريف مخطط tourSchema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name must have less or equal than 40 characters'],
    minlength: [10, 'A tour name must have more or equal than 10 characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a max group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        // فقط يتحقق من القيمة أثناء إنشاء مستند جديد
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false
  },
  startDates: [Date],
  startLocation: {
    type: {type: String,default:'Point',enum:['Point']},
    coordinates: [Number],
    address: String,
    description: String
  },
  locations:[ {
    type: {type: String,default:'Point',enum:['Point']},
    coordinates: [Number],
    address: String,
    description: String,
    day: Number
  }],
  guides: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_tour'
  }]
}, {virtuals: true});
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
tourSchema.plugin(mongooseLeanVirtuals);
tourSchema.set('toJSON', { virtuals: true });
tourSchema.set('toObject', { virtuals: true });
//Virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id', // Find tour where `localField`
  foreignField: 'tour' // is equal to `foreignField`
  //look for the _id of the tour in the tour field in review
});

tourSchema.pre(/^find/, function (next) { 
  this.populate({
    path: 'guides',
        select:'-__v'
  })
  next();
})

// إنشاء النموذج
const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;



// const testtour = new tour({ name: "osaaaa", price: 5452 })
// testtour.save().then((d) => { console.log(d) , console.log("okay inserted in db")}).catch((err) => { console.log("erorr🎆🎆🎆",err) })

// module.exports = Tour;