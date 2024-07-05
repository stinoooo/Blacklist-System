const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const colors = require("colors");

let table = new ascii("Commands");
table.setHeading("Command", "Load Status");

module.exports = (client) => {
    readdirSync("./command/").forEach(dir => {
        const commandFiles = readdirSync(`./command/${dir}/`).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../command/${dir}/${file}`);
    
            if (command.name) {
                client.commands.set(command.name, command);
                table.addRow(file, '✅');

                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => client.aliases.set(alias, command.name));
                }
            } else {
                table.addRow(file, '❌');
            }
        }
    });

    console.log(table.toString().brightCyan);
};
