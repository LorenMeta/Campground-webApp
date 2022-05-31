const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 25) + 10;
        const camp = await new Campground({
            author: '625a86c1e8183ff2914065ab',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam maxime, quo maiores assumenda optio magnam error sed ducimus harum inventore minus aliquam quod similique sint possimus? Sapiente quo vitae at!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/lorenyelpcamp/image/upload/v1652336192/YelpCamp/juzjsdllzgc141yb1iwm.jpg',
                    filename: 'YelpCamp/juzjsdllzgc141yb1iwm'
                },
                {
                    url: 'https://res.cloudinary.com/lorenyelpcamp/image/upload/v1652336162/YelpCamp/rsh4a9deipsyopq2xsqm.jpg',
                    filename: 'YelpCamp/rsh4a9deipsyopq2xsqm'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

