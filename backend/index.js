"use strict";

const dotenv = require("dotenv")
const express = require("express");
const promMid = require('express-prometheus-middleware');
const cors = require("cors");
const connectdb = require("./app/config/config_db")

const cors_options = {
    origin: process.env.CORSURL || "http://localhost:4200"
};

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
connectdb();

app.use(cors(cors_options));
app.use(express.json());
require('./app/models/index.js');
require('./app/config/passport.js');
app.use(require("./app/router/index"));

app.use(promMid({
    metricsPath: '/api/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));


app.listen(PORT, () => {
    console.log(`The app is in 127.0.0.1:${PORT}`);
})//listen