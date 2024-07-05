const colors = require("colors");
const figlet = require('figlet');

module.exports = {
    name: 'ready',
    async execute(client) {
        figlet('bossman', (err, data) => {
            if (err) {
                console.error('An error occurred with figlet:', err);
                return;
            }
            console.log(data.brightRed);
        });

        client.user.setPresence({
            status: 'online',
            activity: {
                name: 'BUK Administration Team',
                type: 'LISTENING',
            }
        });
    }
};
