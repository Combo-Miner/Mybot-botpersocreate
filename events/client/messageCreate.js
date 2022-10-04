const client = require("../../index")
const dbs = require("quick.db")
const config = client.config
client.on("messageCreate", async (message) => {
    
    
   
    let prefix = dbs.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = config.prefix
    }
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;
      
                if (message.author.bot) return;
               

             
            
            
                const [cmd, ...args] = message.content 
                    .slice(prefix.length)
                    .trim()
                    .split(/ +/g);
                const Discord = require('discord.js')
         
            
                const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()))
                if(!command) return;
           
               
          
                
                
            
                if (command) {  
                    
                
        
                await command.run(client, message, args, Discord)
    
               
            
            
            }
             })