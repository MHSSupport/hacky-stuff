const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "owner",
      category: "Information",
    });
  }

  async run(message, args) {
    const guild = args[0]
        ? this.client.guilds.cache.get(args[0])
        : message.guild,
      owner = await this.client.users.fetch(guild.ownerID);

    const e = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .setTitle(guild.name)

      .addField(`Guild:`, [
        `Name: ${guild.name}`,
        `ID: ${guild.id}`,
        `Time Created: ${moment(guild.createdTimestamp).format("LT")} ${moment(
          guild.createdTimestamp
        ).format("LL")} (${moment(guild.createdTimestamp).fromNow()})`,
      ])

      .addField(`Owner`, [`Owner Tag: ${owner.tag}`, `Owner ID: ${owner.id}`]);

    message.channel.send(e);
  }
};
