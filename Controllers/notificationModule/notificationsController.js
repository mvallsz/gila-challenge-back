const NotificationRecord = require("../../Models/notification-record");
const logger = require('../../Helpers/config-log');

const getRecords = async (req, resp) => {

    try {
        const notifications = await NotificationRecord.find();
        resp.json({
            ok : true,
            msg : 'list of notifications records',
            data: notifications
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of notification records, contact support',
            error: e
        });
    }
}

const getRecordsPag = async (req, resp) => {

    try {
        const from = Number(req.query.from) || 0;
        const limitQ = Number(req.query.limit) || 0;

        const [ notificationRecords, total ] = await Promise.all([
            NotificationRecord
                .find()
                .skip( from )
                .populate('user', 'name')
                .populate('message', '_id title')
                .populate('channel', 'name')
                .limit( limitQ ),
            NotificationRecord.countDocuments()
        ]);
        resp.json({
            ok : true,
            msg : 'List of notifications, from: ' + from + ' to: ' + (from + limitQ) + ' of ' + total,
            data: notificationRecords,
            total: total
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of notification records, contact support',
            error: e
        });
    }
}

const getRecord = async (req, resp) => {

    const id = req.params.id;
    try {
        const recordAsIs = await NotificationRecord.findById(id)
            .populate('user', '_id name')
            .populate('message')
            .populate('channel', '_id name');

        if (!recordAsIs){
            return resp.status(204).json({
                ok: false,
                msg: 'There are no record associated with the id'
            });
        }
        resp.json({
            ok : true,
            msg : 'Record returned successfully',
            data : recordAsIs,
            uid : id
        });

    } catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a record, contact support',
            error: e
        });
    }
}

const createRecord = async (record) => {

    try {
        const notificationRecord = new NotificationRecord(record);
        await notificationRecord.save();

        logger.info('---------------------------');
        logger.info('We just add a new registry');
        logger.info('user:' + notificationRecord.user + ', message:' + notificationRecord.message + ', channel: ' + notificationRecord.channel);
        logger.info('date:' + notificationRecord.notificationDate);

        return notificationRecord;

    }catch (e) {
        logger.error(e);
        return -1;
    }
}

module.exports = {
    getRecords,
    getRecordsPag,
    createRecord,
    getRecord
}
