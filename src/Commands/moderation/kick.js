const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "kick",
      category: "Moderation",
    });
  }

  async run(message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply(
        "Sorry, you don't have permissions to use this! This command requires the *KICK_MEMBERS* permission."
      );
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`i do not have the kick members permission`);
    }

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return message.reply(
        "Please mention a valid member of this server to kick"
      );
    if (!member.kickable)
      return message.reply(
        "I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
      );

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    await member
      .kick(reason)
      .catch((error) =>
        message.reply(
          `Sorry ${message.author} I couldn't kick because of : ${error}`
        )
      );
    await member.send(
      `You have been kick from: ${message.guild.name}, for: ${reason ? reason : !reason
      }, by: ${message.author.tag} (${message.author.id})`
    );
    message.reply(
      `${member.user.tag} (${member.user.id}) has been kicked by ${message.author.tag} because: ${reason}`
    );
  }
};
