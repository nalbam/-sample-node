'use strict';

const os = require('os'),
    cors = require('cors'),
    express = require('express'),
    bodyParser = require('body-parser'),
    moment = require('moment-timezone'),
    redis = require('redis');

// REDIS_HOST=localhost node server.js

// express
const app = express();
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use('/favicon.ico', express.static('views/favicon.ico'));
app.use('/counter.js', express.static('views/counter.js'));

// redis
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(REDIS_URL);
client.on('connect', () => {
    console.log(`connected to redis: ${REDIS_URL}`);
});
client.on('error', err => {
    console.log(`${err}`);
});

app.get('/', function (req, res) {
    let host = os.hostname();
    let date = moment().tz('Asia/Seoul').format();
    res.render('index.ejs', {host: host, date: date});
});

app.get('/cache/:name', function (req, res) {
    const name = req.params.name;
    return client.get(`cache:${name}`, (err, result) => {
        return res.status(200).json(result == null ? {} : JSON.parse(result));
    });
});

app.post('/cache/:name', function (req, res) {
    const name = req.params.name;
    const json = JSON.stringify(req.body);
    console.log(`req.body: ${json}`);
    return client.set(`cache:${name}`, json, (err, result) => {
        return res.status(200).json(result == null ? {} : result);
    });
});

app.get('/counter/:name', function (req, res) {
    const name = req.params.name;
    return client.get(`counter:${name}`, (err, result) => {
        return res.status(200).json({ name: `${name}`, count: result == null ? 0 : result });
    });
});

app.post('/counter/:name/incr', function (req, res) {
    const name = req.params.name;
    return client.incr(`counter:${name}`, (err, result) => {
        return res.status(200).json({ name: `${name}`, count: result });
    });
});

app.post('/counter/:name/decr', function (req, res) {
    const name = req.params.name;
    return client.decr(`counter:${name}`, (err, result) => {
        return res.status(200).json({ name: `${name}`, count: result });
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
