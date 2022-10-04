


const ms = require('ms');
const gdate = require('gdate')
const dateFormater = require('pm-date-formater');
const {Message,Client} = require('discord.js')
const bot = require("../../models/mybot")

module.exports = {

            name: 'botperso',
            description: 'Crée un bot perso',
           
          
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * 
     */

    run: async (client, message,args) =>  {
        
        
     
        
        if (message.member.id !== client.config.ownerID) return message.channel.send(`{"message": "Unauthorized"}`);
        const create = args[0] == "create";
        if (create) {
            const filter1 = m => m.author.id === message.author.id
            message.channel.send(" \`SUCCÈS\` Mentionne le client !(timeout dans 30s & \`cancel\` pour annuler)")
            const responseClient = await message.channel.awaitMessages( {
                filter: filter1,
                max: 1,
                time: 30000
            }).catch(() => {
                message.channel.send("Opération annulée pas de réponse après 30s")
            })
            const CollectedClient = responseClient.first();
            if (CollectedClient.content.toLowerCase() == "cancel") return message.channel.send("L'opération a été annulée")

            const member = CollectedClient.mentions.users.first() || await client.users.fetch(CollectedClient.content);
            if(!member) return message.channel.send('Invalide')


            message.channel.send("\`SUCCÈS\` Veuillez écrire une durée de l'abonnement en jours !(timeout dans 30s & \`cancel\` pour annuler)")
            const responseTime = await message.channel.awaitMessages( {
                filter:m => m.author.id === message.author.id,
                max: 1,
                timeout: 30000
            }).catch(() => {
                message.channel.send("Opération annulée pas de réponse après 30s")
            })
            const CollectedTime = responseTime.first().content.toLowerCase();

            if (CollectedTime === "cancel") return message.channel.send("L'opération a été annulée");
            if (isNaN(ms(CollectedTime))) return message.channel.send("Mets une durée valide !");
            const dur = CollectedTime.replace("d", " ")

            message.channel.send("\`SUCCÈS\` Veuillez écrire l'id du bot !(timeout dans 30s & \`cancel\` pour annuler)")
            const responseTimes = await message.channel.awaitMessages( {
                filter:m => m.author.id === message.author.id,
                max: 1,
                timeout: 30000
            }).catch(() => {
                message.channel.send("Opération annulée pas de réponse après 30s")
            })
            const CollectedTimes = responseTimes.map(c => c.content ).join()
            
            console.log(CollectedTimes)
            if(isNaN(CollectedTimes)) return message.channel.send("Id invalide")

           


            let time = new Date(new Date().getTime() + (dur * 24 * 60 * 60 * 1000));
            time = gdate.createYYYYMMDD(time);
           

            while (time.includes('/')) {
                time = time.replace('/', '-')


            }
            const formattime = dateFormater.formatDate(new Date(time), 'yyyy-MM-dd');
           
           bot.findOne({
            User: member.id,
        }, async (err, data) => {
           
            if (err) throw err;
            if (!data) {
                data = new bot({
                    User: member.id,
                    BotId : CollectedTimes,
                    content: [{
                        botid : CollectedTimes,
                        time : time,
                    }]
                })
                message.channel.send("J'ai réussi a crée un bot pour " + member.username)
            } else {
                const object = {
                    botid : CollectedTimes,
                    time :  time,
                }
                data.content.push(object)
            }
          await   data.save()
           
            

        })
            


   } 
}
};