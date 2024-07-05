const blacklist = require('../../me-modals/blacklist/blacklisted');
const config = require('../../me-config.json');
const administrationTeam = config.dev;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unblacklist",
    category: "Security",
    description: "Removes a user from the blacklist.",
    run: async (client, message, args, PREFIX) => {
        if (!administrationTeam.includes(message.author.id)) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: This command is restricted to the BUK Administration Team.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const userId = args[0];
        if (!userId) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: You must provide the user ID.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const data = await blacklist.findOneAndDelete({ UserID: userId });
        if (!data) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: This user is not on the blacklist.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const embed = new MessageEmbed()
            .setDescription(`
**🌐 The user has been removed from the blacklist.**
            `)
            .setColor("#002a7b");

        message.channel.send({ embeds: [embed] });
    }
};
