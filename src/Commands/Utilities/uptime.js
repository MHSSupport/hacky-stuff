const Command = require("../../Structures/Command"),
  ms = require("ms"),
  { MessageEmbed } = require("discord.js"),
  os = require("os");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["ut"],
      description: "This provides the current uptime of the bot.",
      category: "Utilities",
    });
  }
  // eslint-disable-next-line no-unused-vars

  async run(message) {
    const e = new MessageEmbed()
      .setColor("RANDOM")
      .addField(`My uptime is`, [
        `\`${ms(this.client.uptime, { long: true })}\``,
      ])
      .addField(`My host uptime is`, [
        `\`${ms(os.uptime() * 1000, { long: true })}\``,
      ])
      .setTimestamp();
    message.channel.send(e);
  }
};
