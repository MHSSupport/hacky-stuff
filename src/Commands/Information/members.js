const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "members",
      category: "Information",
    });
  }

  async run(message, args) {
    const guild = this.client.guilds.cache.get(args[0]) || message.guild;

    const e = new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .setColor("RANDOM")
      .setTimestamp()
      .addField(`Total:`, [`${guild.memberCount.toLocaleString()}`])
      .addField(`Humans:`, [
        `${guild.members.cache
          .filter((member) => !member.user.bot)
          .size.toLocaleString()}`,
      ])
      .addField(`Bots:`, [
        `${guild.members.cache
          .filter((member) => member.user.bot)
          .size.toLocaleString()}`,
      ]);
    message.channel.send(e);
  }
};
