/*
*
* RUTA: /api/categories
*
* */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../../Middlewares/fields-validator');

const { createCategory, getCategoriesPag } = require('../../Controllers/notificationModule/categoryController')

const categoriesRouter = Router();

categoriesRouter.get('/', getCategoriesPag);

categoriesRouter.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        fieldValidator
    ]
    , createCategory);

module.exports = categoriesRouter;
