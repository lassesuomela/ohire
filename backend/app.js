require('dotenv').config()

const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");

const port = process.env.DOCKER_APP_PORT || 8081;

let app = express();

app.use(cors());
app.options('*', cors());

app.set('trust proxy', '127.0.0.1');

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// start the server and bind to all interfaces
app.listen(port, "0.0.0.0", () => {
    console.log(`Listening at http://localhost:${port}`);
});

// handle ctrl + c
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    db.end(function (err) {
        // all connections in the pool have ended
        console.log('Closed all pool connections');
        process.exit();
    });
});
