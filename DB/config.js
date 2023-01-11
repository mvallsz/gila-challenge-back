const mongoose = require('mongoose');
const logger = require('../Helpers/config-log');

const DBconexion = async () => {

    try {

        await mongoose.connect(process.env.MONGO_CONNECT,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            });
        logger.info('Connected successfully!');

    }catch (e) {
        throw new Error('error: ' + e);
    }

}

module.exports = {
    DBconexion
};
