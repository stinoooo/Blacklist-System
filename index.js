const { Client, MessageEmbed, Collection } = require("discord.js");
const kingman = require("./alive/keep_work.js");
const fs = require('fs');
const colors = require("colors");
const config = require('./me-config.json');

const client = new Client();
client.commands = new Collection();
client.eventss = new Collection();
client.aliases = new Collection();

kingman();

const TOKEN_BOT = process.env['ME_TOKEN'];
const PREFIX = config.prefix;

client.on("error", console.error);

["command", "events"].forEach(p => {
  require(`./me-handler/${p}`)(client);
});

client.on('message', message => {
  if (message.author.bot) return;

  if (!message.guild) {
    const embed = new MessageEmbed()
      .setDescription("This only works on servers, not in direct messages.")
      .setColor("#002a7b");
    return message.reply({ embeds: [embed] });
  }

  const pmention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(pmention)) {
    const embed = new MessageEmbed()
      .setDescription(`**MY PREFIX IS: ${PREFIX}**`)
      .setColor("#002a7b");
    return message.reply({ embeds: [embed] });
  }

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  if (!commandName.length) return;

  let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
  if (command) {
    command.run(client, message, args, PREFIX);
  }
});

client.login(TOKEN_BOT);
