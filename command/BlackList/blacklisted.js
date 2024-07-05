const blacklist = require('../../me-modals/blacklist/blacklisted');
const config = require('../../me-config.json');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "blacklisted",
    category: "Security",
    description: "Displays the list of blacklisted members.",
    run: async (client, message, args, PREFIX) => {
        try {
            const data = await blacklist.find({});
            const users = data.map(d => `<@!${d.UserID}>`);

            if (users.length === 0) {
                const embed = new MessageEmbed()
                    .setDescription("**No blacklisted users found.**")
                    .setColor("#002a7b");
                return message.reply({ embeds: [embed] });
            }

            const embed = new MessageEmbed()
                .setTitle("**Blacklisted Members**")
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL())
                .addField("**Blacklisted**", `* ${users.join(`\n *`)}`)
                .setColor("#002a7b");

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching blacklisted users:', error);
            const embed = new MessageEmbed()
                .setDescription("**An error occurred while retrieving the blacklist.**")
                .setColor("#002a7b");
            message.reply({ embeds: [embed] });
        }
    }
};
