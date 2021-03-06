const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slugs = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

storeSchema.pre('save', function(next) {
    if(!this.isModified('name')){
        return next(); //skips and stops function from running
    }
    this.slug = slug(this.name);
    next();
    //TODO make slugs unique
});
module.exports =mongoose.model('Store', storeSchema)