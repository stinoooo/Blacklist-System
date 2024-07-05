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
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: This command is restricted to the BUK Administration Team.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: No target specified.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const reason = args.slice(1).join(" ");
        if (!reason) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: No blacklist reason provided.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        if (administrationTeam.includes(target.id)) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: Cannot use this command on a member of the BUK Administration Team.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        let existingData = await blacklist.findOne({ UserID: target.id });
        if (existingData) {
            const embed = new MessageEmbed()
                .setDescription(`
**⛔ Command Execution Failed** 
**Reason: This user is already blacklisted.**
                `)
                .setColor("#002a7b");
            return message.reply({ embeds: [embed] });
        }

        const newData = new blacklist({
            UserID: target.id,
            Reason: reason,
            Time: Date.now(),
        });
        await newData.save().catch(e => console.error('Error saving blacklist data:', e));

        client.guilds.cache.forEach(async guild => {
            try {
                const member = guild.members.cache.get(target.id);
                if (member) {
                    await member.ban({ reason }).catch(e => console.error('Error banning user:', e));
                }
            } catch (e) {
                console.error('Error processing guild member ban:', e);
            }
        });

        const embed = new MessageEmbed()
            .setDescription(`
**🌐 ${target} has been added to the blacklist.**
**Reason: ${reason}**
            `)
            .setColor("#002a7b");
        message.channel.send({ embeds: [embed] });
    }
};
