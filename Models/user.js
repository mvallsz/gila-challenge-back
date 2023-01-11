const { Schema , model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:false,
    },
    suscribed:[{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    }],
    channels:[{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: false
    }],
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    },
});

module.exports = model('User', UserSchema);
