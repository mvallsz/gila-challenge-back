const { Schema , model } = require('mongoose');

const CategorySchema = Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:false,
    },
    status:{
        type:Boolean,
        required:false,
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    },

});

module.exports = model('Category', CategorySchema);
