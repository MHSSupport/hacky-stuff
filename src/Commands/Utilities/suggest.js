const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "suggest",
      category: "Utilities",
    });
  }

  async run(message, args) {
    const neededChannel = "816826143012552726",
      channel = this.client.channels.cache.get(neededChannel);

    if (!neededChannel || !channel) return;
    if (!args[0]) return message.channel.send("You need to enter a suggestion");

    message.channel.send(
      `Thank you <@${message.author.id}> for giving your suggestion`
    );

    const embed = new MessageEmbed()
      .setTitle(`New Suggestion`)
      .setColor("RANDOM")
      .setTimestamp()
      .addField(`User Information`, [
        `Username: ${message.author.tag}`,
        `ID: ${message.author.id}`,
      ])
      .addField(`Server Information`, [
        `Guild Name: ${message.guild.name}`,
        `Guild ID: ${message.guild.id}`,
      ])

      .addField(`Suggestion:`, [`${args.join(" ")}`])
      .setTimestamp();

    channel.send(embed);
  }
};
