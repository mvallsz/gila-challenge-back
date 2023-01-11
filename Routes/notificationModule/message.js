/*
*
* RUTA: /api/messages
*
* */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../../Middlewares/fields-validator');

const { createMessage, getMessagesPag } = require('../../Controllers/notificationModule/messageController')

const messageRouter = Router();

messageRouter.get('/', getMessagesPag);

messageRouter.post('/',
    [
        check('title', 'title is required').not().isEmpty(),
        check('category', 'category is required').not().isEmpty(),
        check('channels', 'channels is required').not().isEmpty(),
        fieldValidator
    ]
    , createMessage);

module.exports = messageRouter;
