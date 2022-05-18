
// File Imports
const { Token } = require("./config.js");

// Module Imports
require('colors');
const Discord = require('discord.js');
const client = new Discord.Client({ 
  partials: [ "USER", "CHANNEL", "MESSAGE", "REACTION" ],
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

// Bot Stuff
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

// Handlers
['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
})
  
// Bot Login
client.login(Token).catch(() => console.log(new Error("Invalid Discord Bot Token Provided!")));

