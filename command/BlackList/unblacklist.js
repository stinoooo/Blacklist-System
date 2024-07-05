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
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: This command is restricted to the BUK Administration Team.**
            `);
        }

        const userId = args[0];
        if (!userId) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: You must provide the user ID.**
            `);
        }

        const data = await blacklist.findOneAndDelete({ UserID: userId });
        if (!data) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: This user is not on the blacklist.**
            `);
        }

        message.channel.send(`
> 🌐 **The user has been removed from the blacklist.**
        `);
    }
};
