const Discord = require("discord.js");
const CoolDowns = new Discord.Collection();

const ms = require('ms')

const { Owner } = require("../../config.js");

module.exports = async(Discord, client, message) => {
  try {
    if(message.author.bot || message.channel.type === 'DM') return;

    const guild = await client.storage.messageGuild(message);

    if(!guild) { return client.storage.createGuild(client, message.guild); }

    const prefix = guild.prefix;

    let args = await message.content.slice(prefix.length).split(/ +/g), command = await args.shift().toLowerCase();
    
    command = await client.commands.get(command) || await client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(!message.content.startsWith(prefix)) return;
    if (!command) return;
    
    try {

      if (!CoolDowns.has(command.name)) await CoolDowns.set(command.name, new Discord.Collection());
      const Timestamps = CoolDowns.get(command.name), CoolDown = parseInt(command.cooldown || 2000), Now = Date.now();
      if (Timestamps.has(message.author.id)) {
        const ExpireTime = Timestamps.get(message.author.id) + CoolDown;
        if (Now < ExpireTime) {
          const Embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor("Slow Down", message.author.avatarURL({ dynamic: true }))
          .setDescription(`Please Wait **${ms(ExpireTime - Now, { verbose: true, secondsDecimalDigits: 0, long: true })}** Before Using **${command.name.charAt(0).toUpperCase() + command.name.slice(1)}** Command Again`)
          .setTimestamp();
          return message.channel.send({ embeds: [Embed] }).then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })
        };
      };

      Timestamps.set(message.author.id, Now);
      await command.execute(client, message, args, Discord, Owner);
    
    } catch (error){
      client.util.commandError(client, Discord, message, error);
    };
  }  catch (error) {
    client.util.databaseError(client, Discord, message, error);
  }
}

module.exports.CoolDown = CoolDowns;