const mongoose = require('mongoose');
const logger=require('../configuration/logger')

const mongo_url = "mongodb://localhost:27017/";

mongoose.connect(mongo_url)
    .then(() => {
        logger.info('MongoDB Connected...');
    }).catch((err) => {
        logger.err('MongoDB Connection Error: ', err);
    })

