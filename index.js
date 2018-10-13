const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "/";

client.login("NTAwNjM3ODIyNjI2MTY4ODUz.DqN2ow._L4LEVsfekJLRRl95eXUacK59BU");

client.on("ready", () => {
    console.log("bot pret")

    console.log("Bot Prêt a être utilisé !");
    client.user.setActivity("/help |" + ' ' + client.users.size + ' ' + "membres |")

});

client.on('message', message => { 
    
    if(message.content === prefix + "ping"){
        message.channel.send("*Pong !*");
    }

    if (message.content === prefix + "help") {
        var aide_embed = new Discord.RichEmbed()
        .setColor('#00cfff')
        .setTitle("Voici mes commandes :")
        .addField("/help", "Affiche les commandes du bot")
        .addField("/ban", "Permet de ban un utilisateur du serveur")
        .addField("/warn", "Permet de warn un utilisateur du serveur")
        .addField("/kick", "Permet de kick un utilisateur du serveur")
        .addField("/ping", "Le bot répond")
        .addField("!info", "Vous donne des infos utiles ou non")
        .setFooter("Menu d'aide -  Doramai")
        message.channel.send(aide_embed);
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la perission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} est ban par ${message.author.username} !`)
        });
        
    }
      
        // If the message content starts with "!kick"
        if (message.content.startsWith('/kick')) {
          // Assuming we mention someone in the message, this will return the user
          // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
          const user = message.mentions.users.first();
          if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission!");
          // If we have a user mentioned
          if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
              /**
               * Kick the member
               * Make sure you run this on a member, not a user!
               * There are big differences between a user and a member
               */
              member.kick('Optional reason that will display in the audit logs').then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`Successfully kicked ${user.tag}`);
              }).catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply('I was unable to kick the member');
                // Log the error
                console.error(err);
              });
            } else {
              // The mentioned user isn't in this guild
              message.reply('That user isn\'t in this guild!');
            }
          // Otherwise, if no user was mentioned
          } else {
            message.reply('You didn\'t mention the user to kick!');
          }
        }
      })

      // Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'accueil');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`${member} Bienvenue sur le serveur discord`);

});
