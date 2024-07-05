const blacklist = require('../../me-modals/blacklist/blacklisted');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "blacklistedinfo",
    category: "Security",
    description: "Displays information about a blacklisted user.",
    run: async (client, message, args, PREFIX) => {
        if (!args[0]) {
            const embed = new MessageEmbed()
                .setDescription(`
> **⛔ Command Execution Failed** 
> **Reason: You must provide the user ID.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const data = await blacklist.findOne({ UserID: args[0] });
        if (!data) {
            const embed = new MessageEmbed()
                .setDescription(`
> **⛔ Command Execution Failed** 
> **Reason: This user is not on the blacklist.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const infoEmbed = new MessageEmbed()
            .setTitle(`Blacklisted User Info`)
            .setDescription(`Details of the blacklisted user.`)
            .setColor("#002a7b")
            .addFields(
                { name: '**ID**', value: data.UserID, inline: false },
                { name: '**Reason**', value: data.Reason, inline: false },
                { name: '**Time**', value: data.Time.toISOString().split('T')[0], inline: false },
            );

        message.channel.send({ embeds: [infoEmbed] });
    }
};
