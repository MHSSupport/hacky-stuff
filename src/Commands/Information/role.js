const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "role",
      category: "Information",
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    if (args.length < 1)
      return message.channel.send("**Please Enter A Role!**");

    const role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role) return message.channel.send("**Please Enter A Valid Role!**");

    const membersWithRole = message.guild.members.cache
        .filter((member) =>
          member.roles.cache.find((r) => r.name === role.name)
        )
        .map((member) => member.user.tag),
      roleEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL())
        .setTitle(
          `Users With The ${role.name} Role! [${membersWithRole.length}]`
        )
        .setDescription(membersWithRole.join("\n"));
    message.channel
      .send(roleEmbed)
      .catch(() => message.channel.send("**List Is Too Long!**"));
  }
};
