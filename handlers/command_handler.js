const fs = require('fs');

module.exports = (client, Discord) => {
    const Categories = ["cmds"];
    let webcommands = []
    Categories.forEach((Category) => {
        const comandFiles = fs.readdirSync(`./commands/${Category}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for(const file of comandFiles){
            const command = require(`../commands/${Category}/${file}`);

            if (!command.name || !command.aliases) return console.log(`${command.name}`.underline.red + ` Failed To Load - ❌`.underline.red);

            client.commands.set(command.name, command)

            if(command.name) console.log(`${command.name}`.blue + ` Has Been Loaded - ✅`.green)
        }
    });
}

/*

const Categories = ["cmds", "fun", "creator", "filters", "mod", "setup", "economy", "games"];
let webcommands = []
Categories.forEach((Category) => {
    const comandFiles = fs.readdirSync(`./bot/commands/${Category}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    for(const file of comandFiles){
        const command = require(`../commands/${Category}/${file}`);

        if (!command.name || !command.aliases) return console.log(`${command.name}`.underline.red + ` Failed To Load - ❌`.underline.red);

        webcommands.push(command.name, command)

        if(command.name) console.log(`${command.name}`.blue + ` Has Been Loaded - ✅`.green)
    }
});

module.exports.WebCommands = webcommands;

*/