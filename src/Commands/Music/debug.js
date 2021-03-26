const Command = require("../../Structures/Command"),
  vortexMusicEmbed = require("../../Structures/vortexMusicEmbed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "debug",
      category: "Music",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const guild = this.client.guilds.cache.get(args[0]) || message.guild;

    const e = new vortexMusicEmbed()
      .setTitle(`Debug info for ${guild.name}`)
      .setColor("RANDOM")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addField(`Info`, [
        `Tag: ${this.client.user.username}`,
        `ID: ${this.client.user.id}`,
        `Voice channels: ${this.client.voice.connections.size}`,
      ])
      .addField(`Guild:`, [
        `Name: ${guild.name}`,
        `ID: ${guild.id}`,
        `Users: ${guild.memberCount.toLocaleString()}`,
      ]);

    message.channel.send(e);
  }
};
