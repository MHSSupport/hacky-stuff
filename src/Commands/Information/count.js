const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "count",
      category: "Information",
    });
  }

  async run(message, args) {
    const members = message.guild.members.cache;
    const e = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(
        this.client.user.displayAvatarURL({ dynamic: true, size: 512 })
      )
      .setTitle(this.client.user.username, `User and Guild Count`)
      .addField(`Users:`, [
        `\`\`\`${this.client.users.cache.size.toLocaleString()}\`\`\``,
      ])

      .addField(`Guilds`, [
        `\`\`\`${this.client.guilds.cache.size.toLocaleString()}\`\`\``,
      ])

      .setTimestamp();

    message.channel.send(e);
  }
};
