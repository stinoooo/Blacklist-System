const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    category: "Developers",
    description: "Displays a list of available commands.",
    run: async (client, message, args, PREFIX) => {
        const commands = client.commands.array();
        const embed = new MessageEmbed()
            .setTitle("BUK Blacklist System - Help Menu")
            .setDescription("**[Help Menu](https://github.com/KMKINGMAN)**")
            .setColor("#002a7b");

        commands.forEach((cmd) => {
            embed.addField(
                `**${PREFIX}${cmd.name} ${cmd.aliases ? `(${cmd.aliases.join(", ")})` : ""}**`,
                `${cmd.description}`,
                false
            );
        });

        message.channel.send(embed);
    }
};
