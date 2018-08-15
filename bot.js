const Discord = require('discord.js');
const Client = new Discord.Client({disableEveryone: true});
const prefix = require('botconfig.json');
bot.on("ready", () => {
  console.log(`I'm ready!`);

  bot.user.setActivity("Fyremc",{"type":"Játszok"})

  //bot.user.setGame("on SourceCade!");
});

Client.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nem található a játékos!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ezt nem lehet!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ezt a személyt nem kickelheted!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kickelt játékos:", `${kUser} ID-vel: ${kUser.id}`)
    .addField("Kickelte:", `<@${message.author.id}> ID-vel ${message.author.id}`)
    .addField("Kickelte a csatornában:", message.channel)
    .addField("Idő:", message.createdAt)
    .addField("Oka:", kReason);

    let kickChannel = message.guild.channels.find(`name`, "chat");
    if(!kickChannel) return message.channel.send("Nemtalálhato az chat szoba.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("A játékos nem található!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ezt a személyt nem kickelheted!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Bannolt játékos:", `${bUser} ID-vel: ${bUser.id}`)
    .addField("Bannolta:", `<@${message.author.id}> ID-vel: ${message.author.id}`)
    .addField("Bannolás szobája:", message.channel)
    .addField("Idő:", message.createdAt)
    .addField("Ban oka:", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "chat");
    if(!incidentchannel) return message.channel.send("Nem található az chat szoba.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Jelentett játékos:", `${rUser} ID-vel: ${rUser.id}`)
    .addField("Jelentette:", `${message.author} ID-vel: ${message.author.id}`)
    .addField("Szoba:", message.channel)
    .addField("Ideje:", message.createdAt)
    .addField("Oka:", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Nem található a report Szoba.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }


  if(cmd === `${prefix}tempban`){

    let cUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!cUser) return message.channel.send("A Játékos nem található!");
    let cReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Ezt nem lehet!");
    if(cUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ezt a személyt nem tempbannolhatod!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~TempBan~")
    .setColor("#bc0000")
    .addField("Tempbannolt játékos:", `${cUser} ID-vel: ${cUser.id}`)
    .addField("Tempbannolta:", `<@${message.author.id}> ID-vel ${message.author.id}`)
    .addField("Tempbannolás Szobája:", message.channel)
    .addField("Ideje:", message.createdAt)
    .addField("Tempbannolás oka:", cReason);

    let incidentchannel = message.guild.channels.find(`name`, "chat");
    if(!incidentchannel) return message.channel.send("Nem található az chat szoba.");

    message.guild.member(cUser).ban(cReason);
    incidentchannel.send(banEmbed);


    return message.channel.send(botembed);
  }



  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Szerver információk")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Szerver neve:", message.guild.name)
    .addField("Készült:", message.guild.createdAt)
    .addField("Te Csatlakoztál:", message.member.joinedAt)
    .addField("Játékosok száma:", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot információk")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot neve:", bot.user.username)
    .addField("Készült:", bot.user.createdAt);

    return message.channel.send(botembed);
  }

});

Client.login(process.env.BOT_TOKEN);
