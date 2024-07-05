const colors = require("colors");
const mongoose = require('mongoose');
const discord = require("discord.js");
const MONGO_DDB = process.env["ME_MONGO"];

module.exports = {
    name: 'ready',
    async execute(client) {
        mongoose.connect(MONGO_DDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => console.log(`
_______________________________

[✅] MongoDB Connection Successful 
_______________________________
        `.brightGreen))
            .catch(err => console.error('MongoDB Connection Error:', err));
    }
};
