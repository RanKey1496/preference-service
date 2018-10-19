import 'reflect-metadata';
import * as mongoose from 'mongoose';
import App from './app';

console.info(`

8888888b.                    .d888                                                                    .d8888b.                            d8b
888   Y88b                  d88P"                                                                    d88P  Y88b                           Y8P
888    888                  888                                                                      Y88b.
888   d88P 888d888  .d88b.  888888  .d88b.  888d888  .d88b.  88888b.   .d8888b  .d88b.  .d8888b       "Y888b.    .d88b.  888d888 888  888 888  .d8888b  .d88b.
8888888P"  888P"   d8P  Y8b 888    d8P  Y8b 888P"   d8P  Y8b 888 "88b d88P"    d8P  Y8b 88K              "Y88b. d8P  Y8b 888P"   888  888 888 d88P"    d8P  Y8b
888        888     88888888 888    88888888 888     88888888 888  888 888      88888888 "Y8888b.           "888 88888888 888     Y88  88P 888 888      88888888
888        888     Y8b.     888    Y8b.     888     Y8b.     888  888 Y88b.    Y8b.          X88     Y88b  d88P Y8b.     888      Y8bd8P  888 Y88b.    Y8b.
888        888      "Y8888  888     "Y8888  888      "Y8888  888  888  "Y8888P  "Y8888   88888P'      "Y8888P"   "Y8888  888       Y88P   888  "Y8888P  "Y8888
`);

process.on('uncaughtException', (err) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err.message}
    --------------------
    `);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
    });
});

const app: App = new App();
app.start();
module.exports = app;