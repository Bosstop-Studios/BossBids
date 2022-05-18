
module.exports = async(Discord, client, guild) => {
  
  // deleteOne()
  // deleteMany()

  try {

    client.storage.deleteGuildAll(guild)
    client.util.guildLeave(Discord, client, guild)

    // await client.users.cache.get(Owner).send(report)

  }  catch (error) {
    client.util.databaseError(client, Discord, message, error);
  }
}