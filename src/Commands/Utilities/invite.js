const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "invite",
      category: "Utilities",
    });
  }

  async run(message, args) {
    const e = new MessageEmbed()
      .setThumbnail(this.client.user.avatarURL())
      .setColor("RANDOM")
      .setTimestamp()
      .addField(`${this.client.user.username}\'s invite:`, [
        `[here](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=133246855)`,
      ]);
    message.channel.send(e);
  }
};
