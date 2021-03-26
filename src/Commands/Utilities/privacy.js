const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "privacy",
      category: "Utilities",
    });
  }
  async run(message, args) {
    const e = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${this.client.user.tag}\'s Policy`)
      .setDescription(
        `Nothing sufficent is stored by ${this.client.user.tag}, and nothing is used except the data you give the bot`
      );
    message.channel.send(e);
  }
};
