const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "avatar",
      aliases: ["av"],
      category: "Information",
    });
  }
  async run(message, args) {
    const member =
      message.guild.members.cache.get(args[0]) ||
      message.mentions.members.last() ||
      message.member;

    const e = new MessageEmbed()
      .setTitle(`${member.user.username}\'s avatar`)
      .setColor("RANDOM")
      .setTimestamp()
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }));
    message.channel.send(e);
  }
};
