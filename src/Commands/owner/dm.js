const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "dm",
      category: "Owner",
      ownerOnly: true,
    });
  }

  async run(message, args) {
    const user =
      message.guild.members.cache.get(args[0]) ||
      message.mentions.members.first();
    if (message.author.id === user.id)
      return message.channel.send(`You cannot dm yourself`);
    if (!user)
      return message.channel.send(
        "you did not mention a user or you gave an invalid ID"
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("you did not specify your message");
    user
      .send(args.slice(1).join(" "))
      .catch(async function () {
        return message.channel.send(
          "This user cannot be dmed, most likely they have dms off"
        );
      })
      .then(async function () {
        return message.channel.send(`message sent to ${user.user.tag}`);
      });
  }
};
