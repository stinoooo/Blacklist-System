const blacklist = require('../../me-modals/blacklist/blacklisted');
const config = require('../../me-config.json');
const administrationTeam = config.dev;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "blacklist",
    category: "Security",
    description: "Adds a user to the blacklist.",
    run: async (client, message, args, PREFIX) => {
        if (!administrationTeam.includes(message.author.id)) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: This command is restricted to the BUK Administration Team.**
            `);
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: No target specified.**
            `);
        }

        const reason = args.slice(1).join(" ");
        if (!reason) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: No blacklist reason provided.**
            `);
        }

        if (administrationTeam.includes(target.id)) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: Cannot use this command on a member of the BUK Administration Team.**
            `);
        }

        let existingData = await blacklist.findOne({ UserID: target.id });
        if (existingData) {
            return message.reply(`
> **⛔ Command Execution Failed** 
> **Reason: This user is already blacklisted.**
            `);
        }

        if (!existingData) {
            const newData = new blacklist({
                UserID: target.id,
                Reason: reason,
                Time: Date.now(),
            });
            await newData.save().catch(e => console.error('Error saving blacklist data:', e));
        }

        const userData = await blacklist.findOne({ UserID: target.id });

        client.guilds.cache.forEach(async guild => {
            try {
                const member = guild.members.cache.get(userData.UserID);
                if (member) {
                    await member.ban({ reason: userData.Reason }).catch(e => console.error('Error banning user:', e));
                }
            } catch (e) {
                console.error('Error processing guild member ban:', e);
            }
        });

        message.channel.send(`
> **🌐 ${target} has been added to the blacklist.**
> **Reason: ${reason}**
        `);
    }
};
