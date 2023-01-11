const Channel = require("../../Models/channel");
const logger = require('../../Helpers/config-log');

const getChannels = async (req, resp) => {

    try {
        const channels = await Channel.find();
        resp.json({
            ok : true,
            msg : 'list of Channels',
            data: channels
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of Channels, contact support',
            error: e
        });
    }
}

const getChannelsPag = async (req, resp) => {

    try {
        const from = Number(req.query.from) || 0;
        const limitQ = Number(req.query.limit) || 0;

        const [ channels, total ] = await Promise.all([
            Channel
                .find()
                .skip( from )
                .limit( limitQ ),
            Channel.countDocuments()
        ]);
        resp.json({
            ok : true,
            msg : 'List of channels, from: ' + from + ' to: ' + (from + limitQ) + ' of ' + total,
            data: channels,
            total: total
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of Channels, contact support',
            error: e
        });
    }
}

const createChannel = async (req, resp) => {

    try {
        const channel = new Channel(req.body);
        await channel.save();

        resp.json({
            ok : true,
            msg : 'We just add a new channel',
            data: channel,
        });

    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to create a channel, contact support',
            error: e
        });
    }
}

module.exports = {
    getChannels,
    getChannelsPag,
    createChannel
}
