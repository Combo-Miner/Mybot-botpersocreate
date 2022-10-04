const { Client, Collection } = require("discord.js");
const config = require('./config.json')

const client = new Client({
	partials : ["MESSAGE","GUILD_MEMBER","CHANNEL","USER","GUILD_SCHEDULED_EVENT","REACTION"],
    intents: 32767,
});



const db = require("quick.db")
client.setMaxListeners(0)
module.exports = client;


// Collection
client.commands = new Collection();
client.config = require("./config.json")
client.prefix = client.config.prefix
client.aliases = new Collection();

//Bot ping



client.on('messageCreate', async (message) => {
   
       let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = config.prefix
    }
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if(message.content.match(prefixMention)) {
            return message.reply(`*Mon prefix sur ce serveur est* ${prefix}`)
        }
})




             

// Handlers
require("./handler")(client);
require('./handler/anti-crash')(client);

client.login(client.config.token);


