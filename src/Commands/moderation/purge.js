const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "purge",
      category: "Moderation",
    });
  }

  async run(message, args) {
    try {
      const neededPerms = "MANAGE_MESSAGES";

      if (!message.member.hasPermission(neededPerms))
        return message.reply(
          `Sorry, you don't have permissions to use this! This command requires the *${neededPerms}* permission.`
        );

      if (!message.guild.me.hasPermission(neededPerms))
        return message.reply(`Sorry, i don't have permission ${neededPerms}`);

      let messageCount = args[0];

      if (!messageCount)
        return message.channel.send("Please spcify an ammount");
      if (messageCount > 100) messageCount = 100;

      const fetch = await message.channel.messages.fetch({
        limit: messageCount,
      });

      const deletedMessages = await message.channel.bulkDelete(fetch, true);

      const results = {};

      for (const [, deleted] of deletedMessages) {
        const user = `${deleted.author.username}#${deleted.author.discriminator}`;
        if (!results[user]) results[user] = 0;
        results[user]++;
      }

      const userMessageMap = Object.entries(results);

      const formed = `${deletedMessages.size} message${deletedMessages.size > 1 ? "s" : ""
        } were removed.\n\n${userMessageMap
          .map(([user, messages]) => `**${user}**: ${messages}`)
          .join("\n")}`;

      await message.channel
        .send(formed)
        .then(async (msg) => await msg.delete({ timeout: 2560 }));
    } catch (error) {
      message.channel.send(error.message);
    }
  }
};
