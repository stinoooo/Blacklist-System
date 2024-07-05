const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const colors = require("colors");

let table = new ascii("Events");
table.setHeading("Event", "Load Status");

module.exports = (client) => {
    readdirSync("./events/").forEach(dir => {
        const eventFiles = readdirSync(`./events/${dir}/`).filter(file => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../events/${dir}/${file}`);
            if (event.name) {
                client.eventss.set(event.name, event);
                table.addRow(file, '✅');
                client.on(event.name, (...args) => event.execute(...args, client));
            } else {
                table.addRow(file, '❌');
            }
        }
    });

    console.log(table.toString().brightMagenta);
};
