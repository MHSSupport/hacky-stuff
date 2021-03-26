const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["pong"],
      description: "This provides the ping of the bot",
      category: "Utilities",
    });
  }

  async run(message) {
    const msg = await message.channel.send("Pinging..."),
      latency = msg.createdTimestamp - message.createdTimestamp;

    const e = new MessageEmbed()
      .setColor("RANDOM")
      .addField("Bot Latency:", `\`${latency}ms\``)
      .addField("API Latency:", `\`${Math.round(this.client.ws.ping)}ms\``)
      .setTimestamp();

    msg.edit("", e);
  }
};
