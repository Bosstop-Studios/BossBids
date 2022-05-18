const { Server, ReportServerChannel } = require("../../config.js");

const CoolDowns = require("./messageCreate.js").CoolDown

const ms = require('ms')

module.exports = async(Discord, client, interaction) => {
	if (!interaction.isCommand()) return;
	let command = client.commands.get(interaction.commandName);
	if(!command) return;

	try {

		if (!CoolDowns.has(command.name)) await CoolDowns.set(command.name, new Discord.Collection());
		const Timestamps = CoolDowns.get(command.name), CoolDown = parseInt(command.cooldown || 2000), Now = Date.now();
		if (Timestamps.has(interaction.user.id)) {
		  const ExpireTime = Timestamps.get(interaction.user.id) + CoolDown;
		  if (Now < ExpireTime) {
			const Embed = new Discord.MessageEmbed()
			.setColor("RED")
			.setAuthor("Slow Down", interaction.user.avatarURL({ dynamic: true }))
			.setDescription(`Please Wait **${ms(ExpireTime - Now, { verbose: true, secondsDecimalDigits: 0, long: true })}** Before Using **${command.name.charAt(0).toUpperCase() + command.name.slice(1)}** Command Again`)
			.setTimestamp();
			return interaction.reply({ embeds: [Embed], ephemeral: true })
		  };
		};
  
		Timestamps.set(interaction.user.id, Now);
		await command.inti(Discord, client, interaction);

	} catch(error) {
		client.util.interactionError(client, Discord, interaction, error);
	}
}