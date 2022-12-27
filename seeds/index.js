const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '639c7b9222b68ad7685014e1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'hiufuygyuasgiuyfhUIAGFuhudgUAIHDFuyAFUIFGYUFG',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmtd7lje8/image/upload/v1671634685/YelpCamp/ifnm41rnjxr1szhbnndd.jpg',
                  filename: 'YelpCamp/ifnm41rnjxr1szhbnndd'
                },
                {
                  url: 'https://res.cloudinary.com/dmtd7lje8/image/upload/v1671634685/YelpCamp/btyi1vcqnlyi27kwj01x.jpg',
                  filename: 'YelpCamp/btyi1vcqnlyi27kwj01x'
                }
              ]            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})