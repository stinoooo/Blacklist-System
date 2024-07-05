const blacklist = require('../../me-modals/blacklist/blacklisted');
const config = require('../../me-config.json');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "list-blacklist",
    category: "Security",
    description: "Displays the list of blacklisted members.",
    run: async (client, message, args, PREFIX) => {
        try {
            const data = await blacklist.find({});
            const users = data.map(d => `<@!${d.UserID}>`);

            if (users.length === 0) {
                return message.reply("**No blacklisted users found.**");
            }

            const embed = new MessageEmbed()
                .setTitle("**Blacklisted Members**")
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL())
                .addField("**Blacklisted**", `* ${users.join(`\n *`)}`)
                .setColor("GREEN");

            message.channel.send({ embed });
        } catch (error) {
            console.error('Error fetching blacklisted users:', error);
            message.reply("**An error occurred while retrieving the blacklist.**");
        }
    }
};
