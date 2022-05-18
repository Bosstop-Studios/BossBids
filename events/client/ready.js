
module.exports = async(Discord, client, message) => {
    require('../../handlers/inti_handler.js').post(client)
    console.log(`Bot Is Ready - ${client.user.username} \ ${client.user.id}`.cyan);
    client.user.setActivity('=help', { type: 'PLAYING' })
}