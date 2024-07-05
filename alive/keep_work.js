const express = require('express');
const colors = require("colors");
const server = express();

server.all('/', (req, res) => {
    res.send('BUK Blacklist System is active');
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`
_______________________________

[✅]===> HOST IS READY  
_______________________________    
        `.blue);
    });
}

module.exports = keepAlive;
