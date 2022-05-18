
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'afk',
    description: "afk command",
    aliases: [],
    usage: '[=afk]',
    example: '[=afk]',
    data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('TEst'),
    async execute(client, message, args, Discord) {},
    async inti(Discord, client, interaction) {}
}