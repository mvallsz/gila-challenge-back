const Message = require("../../Models/message");
const Channel = require("../../Models/channel");
const logger = require('../../Helpers/config-log');
const mongoose = require('mongoose');

const { getUsersByCat } = require('../../Controllers/usersController');
const { createRecord } = require('../../Controllers/notificationModule/notificationsController');

const getMessages = async (req, resp) => {

    try {
        const messages = await Message.find();
        resp.json({
            ok : true,
            msg : 'list of Messages',
            data: messages
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of Messages, contact support',
            error: e
        });
    }
}

const getMessagesPag = async (req, resp) => {

    try {
        const from = Number(req.query.from) || 0;
        const limitQ = Number(req.query.limit) || 0;

        const [ messages, total ] = await Promise.all([
            Message
                .find()
                .skip( from )
                .limit( limitQ ),
            Message.countDocuments()
        ]);
        resp.json({
            ok : true,
            msg : 'List of messages, from: ' + from + ' to: ' + (from + limitQ) + ' of ' + total,
            data: messages,
            total: total
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of Messages, contact support',
            error: e
        });
    }
}

const createMessage = async (req, resp) => {

    try {

        // save the message in the DB
        const message = new Message(req.body);
        message._id = mongoose.Types.ObjectId();
        await message.save();

        // get all the users for the category of the message
        const usersToNotify = await getUsersByCat(req.body.category);

        //channels of distribution from the message
        const messageChannels = req.body.channels;

        // loop the users that i'm going to notify.
        for (const user of usersToNotify) {

            // the message has within it the distribution channels available
            // That is why in this section I filter the user's channels with those of the message
            // to determine the final list of channels per user to notify.

            const channelsToNoti = user.channels.filter(function(channel){
                if(messageChannels.includes(channel._id.toString())){
                    return channel;
                }
            });

            /*
            * Once I have the channels per user, I execute the notification process and store
            * the event record per channel
            * */

            for (const channel of channelsToNoti) {
                const record = new Object();
                record.message = message._id;
                record.channel = channel;
                record.user = user._id;
                record.deliveryStatus = 1;

                await createRecord(record);
            }
        }

        resp.json({
            ok : true,
            msg : 'We just add a new message, and notified all the distribution list',
            data: message,
        });

    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to create a message, contact support',
            error: e
        });
    }
}

module.exports = {
    getMessages,
    getMessagesPag,
    createMessage
}
