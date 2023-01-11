const { Schema , model } = require('mongoose');

const ChannelSchema = Schema({
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
    }
});

module.exports = model('Channel', ChannelSchema);
