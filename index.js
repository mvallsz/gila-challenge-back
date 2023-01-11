require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./Helpers/config-log');

const fs = require('fs')
const path = require('path');

const { DBconexion } = require('./DB/config')

//Routes for Users operatios
const userRoute = require('./Routes/user')

//Routes NotificationModule
const notificationsRouter = require('./Routes/notificationModule/notification')
const channelsRouter = require('./Routes/notificationModule/channel')
const categoriesRouter = require('./Routes/notificationModule/category')
const messagesRouter = require('./Routes/notificationModule/message')

const app = express();

//configuracion de CORS
app.use(cors());

//configuracion del PARSEO del Body
app.use(express.json());

// log all requests to access.log
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'})
}))

const start = async () => {
    try {
        // DB CONEXION
        const result = await DBconexion();
        //Ruta Api Usuarios
        app.use('/api/users', userRoute);

//------------------ INIT NOTIFICATIONS MODULE ROUTER -------------------------//

        //Ruta Api Notifications
        app.use('/api/notifications', notificationsRouter);

        //Ruta Api Channels
        app.use('/api/channels', channelsRouter);

        //Ruta Api Categories
        app.use('/api/categories', categoriesRouter);

        //Ruta Api Messages
        app.use('/api/messages', messagesRouter);


//------------------ END NOTIFICATIONS MODULE ROUTER ------------------//

        const server = app.listen(process.env.PORT, () => {
            logger.info('Server Up, listening on:' + process.env.PORT);
        });
    } catch (e) {
        logger.error(e);
    }

}
start();
