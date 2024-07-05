const blacklist = require('../../me-modals/blacklist/blacklisted');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bl-info",
    category: "Security",
    description: "Displays information about a blacklisted user.",
    run: async (client, message, args, PREFIX) => {
        if (!args[0]) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: You must provide the user ID.**
            `);
        }

        const data = await blacklist.findOne({ UserID: args[0] });
        if (!data) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: This user is not on the blacklist.**
            `);
        }

        const infoEmbed = new MessageEmbed()
            .setTitle(`Blacklisted User Info`)
            .setDescription(`Details of the blacklisted user.`)
            .setColor("GREEN")
            .addFields(
                { name: '**ID**', value: data.UserID, inline: false },
                { name: '**Reason**', value: data.Reason, inline: false },
                { name: '**Time**', value: data.Time.toISOString().split('T')[0], inline: false },
            );

        message.channel.send(infoEmbed);
    }
};
