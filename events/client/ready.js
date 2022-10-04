const client = require("../../index");

const bot = require("../../models/mybot")




client.on("ready", async() => { 
    console.log(`${client.user.tag} est maiteanant en ligne!`)

    setInterval(()=>{
    bot.findOne({
     User : client.config.ownerID,
  }, async (err, data) => {
     
      if (err) throw err;
      if (!data) {
          console.log("J'appartient à personne x(")
          process.exit()
      } else {
        const e = data.content.map(
             (w, i) => {
               let botid = w.botid == client.user.id
               let nowtime =  new Date(Date.now()).getTime()
               if(botid == true ) {
               let time =  `${(Math.round((new Date(w.time).getTime() - new Date(nowtime).getTime()) /(1000*3600*24)))}`
               console.log(time)
               if(time == 0) {
                console.log("Je m'eteins")
               process.exit()
               }
               }
        })
      }
  

      })
    }  ,10000)
      })

   
  




