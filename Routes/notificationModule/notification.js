/*
*
* RUTA: /api/notifications
*
* */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../../Middlewares/fields-validator');

const { createRecord, getRecord, getRecords, getRecordsPag} = require('../../Controllers/notificationModule/notificationsController')

const notificationsRouter = Router();

notificationsRouter.get('/', getRecordsPag);

notificationsRouter.post('/',
    [
        check('message', 'message is required').not().isEmpty(),
        check('channel', 'channel is required').not().isEmpty(),
        check('user', 'user is required').not().isEmpty(),
        fieldValidator
    ]
    , createRecord);

module.exports = notificationsRouter;
