const { Schema , model } = require('mongoose');

const MessageSchema = Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:false
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    channels:[{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    }],
    status:{
        type:Number,
        required:false,
        default: 1   // 1: ON, 2: OFF
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }
});

module.exports = model('Message', MessageSchema);
