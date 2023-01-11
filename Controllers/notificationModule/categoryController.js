const Category = require("../../Models/category");
const logger = require('../../Helpers/config-log');

const getCategories = async (req, resp) => {

    try {
        const categories = await Category.find();
        resp.json({
            ok : true,
            msg : 'list of Categories',
            data: categories
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of Categories, contact support',
            error: e
        });
    }
}

const getCategoriesPag = async (req, resp) => {

    try {
        const from = Number(req.query.from) || 0;
        const limitQ = Number(req.query.limit) || 0;

        const [ categories, total ] = await Promise.all([
            Category
                .find()
                .skip( from )
                .limit( limitQ ),
            Category.countDocuments()
        ]);
        resp.json({
            ok : true,
            msg : 'List of categories, from: ' + from + ' to: ' + (from + limitQ) + ' of ' + total,
            data: categories,
            total: total
        });
    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to get a list of Categories, contact support',
            error: e
        });
    }
}

const createCategory = async (req, resp) => {

    try {
        const category = new Category(req.body);
        await category.save();

        resp.json({
            ok : true,
            msg : 'We just add a new category',
            data: category,
        });

    }catch (e) {
        logger.error(e);
        resp.status(500).json({
            ok: false,
            msg: 'Unexpected error when trying to create a category, contact support',
            error: e
        });
    }
}

module.exports = {
    getCategories,
    getCategoriesPag,
    createCategory
}
