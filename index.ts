import dotenv from 'dotenv';

new Promise((resolve, reject) => {
    dotenv.config();
    return resolve(true);
}).then(() => {
    // If using import, it does not include env in static logger object
    new (require('./src/server').Server)(process.env.PORT || '8080');
})


