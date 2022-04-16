const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,  //we take an objectId from the Review model
            ref: 'Review' //the model
        }
    ]
})
CampgroundSchema.post('findOneAndDelete', async function (doc) {  //removing all the reviews when deleting a campground
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('Campground', CampgroundSchema);


