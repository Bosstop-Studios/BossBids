const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Token } = require("../config.js");
const rest = new REST({ version: '9' }).setToken(Token);

module.exports.post = (client, Discord) => {
    const commands = [];
    const Categories = ["cmds"];
    Categories.forEach((Category) => {
        const comandFiles = fs.readdirSync(`./commands/${Category}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for(const file of comandFiles){
            const command = require(`../commands/${Category}/${file}`);

            if (!command.data) {
                console.log(`${command.name}`.underline.red + ` INTI Failed To Load - ❌`.underline.red);
            } else {

                commands.push(command.data);

                if(command.name) console.log(`${command.name}`.blue + ` INTI Has Been Loaded - ✅`.green)

            }
        }
    });

    (async () => {
    	try {

            await client.guilds.cache.forEach(async(guild) => {

                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, guild.id),
                    { body: commands },
                );

                console.log(`Posted (/) Commands for ${guild.name}`)

            });

    		console.log('Posted all application (/) commands');
        } catch (error) {
	    	console.error(error);
    	}
    })();
}