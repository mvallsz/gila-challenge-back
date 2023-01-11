/*
*
* RUTA: /api/users
*
* */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser } = require('../Controllers/usersController');

const { fieldValidator } = require('../Middlewares/fields-validator');

const userRouter = Router();

userRouter.get('/', getUsers );

userRouter.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'This is not a valid email').isEmail(),
        fieldValidator
    ]
    , createUser );

userRouter.put( '/:id', updateUser);

module.exports = userRouter;
