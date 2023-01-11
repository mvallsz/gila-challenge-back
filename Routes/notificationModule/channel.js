/*
*
* RUTA: /api/channels
*
* */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../../Middlewares/fields-validator');

const { createChannel, getChannelsPag} = require('../../Controllers/notificationModule/channelController')

const channelsRouter = Router();

channelsRouter.get('/', getChannelsPag);

channelsRouter.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        fieldValidator
    ]
    , createChannel);

module.exports = channelsRouter;
