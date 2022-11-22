const client = require('prom-client');
const express = require('express');
const server = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterHomeEndpoint = new client.Counter({
    name: 'counterHomeEndpoint',
    help: 'The total number of processed requests'
});

const counterMessageEndpoint = new client.Counter({
    name: 'counterMessageEndpoint',
    help: 'The total number of processed requests to get endpoint'
});


server.get('/', (req, res) => {
    counterHomeEndpoint.inc();
    res.send('Hello world\n');
});

server.get('/message', (req, res) => {
    counterMessageEndpoint.inc();
    res.send('Message endpoint\n');
});


server.get('/metrics', (req, res) => {
   res.set('Content-Type', client.register.contentType);
   res.end(client.register.metrics());
});

console.log('Server listening to 3000, metrics exposed on /metrics endpoint');
server.listen(3000);