
module.exports = async(Discord, client, guild) => {
    try {

        client.storage.guildCreate(client, guild)
        client.storage.createGuildWelcome(guild)
        client.storage.createGuildRankCard(guild)

        client.util.guildJoin(Discord, client, guild)

    }  catch (error) {
        client.util.databaseError(client, Discord, message, error);
    }
}