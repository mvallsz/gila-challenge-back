const logger = require('../Helpers/config-log');
const {validationResult} = require("express-validator");

const fieldValidator = (req, resp, next) => {
    const errores = validationResult( req );

    if(!errores.isEmpty()){
        logger.error('some fields in the request are wrong: ' + errores.mapped());
        return resp.status(400).json({
            ok: false,
            errores : errores.mapped()
        });
    }
    next();
}

module.exports = {
    fieldValidator
}