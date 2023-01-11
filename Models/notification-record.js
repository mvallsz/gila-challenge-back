const { Schema , model } = require('mongoose');

const NotificationRecordSchema = Schema({
    message:{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryStatus: {
        type: String,
        default: '1',    // 1 delivered - 2 error on delivery - 3 delivery with error
        required: false,
    },
    notificationDate: {
        type: Date,
        default: Date.now,
        required: false,
    },
});

module.exports = model('NotificationRecord', NotificationRecordSchema);
