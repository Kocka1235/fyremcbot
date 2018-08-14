const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Fyremc",{type:"Játszok"})

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
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
    .addField("Kickelt játékos:", `${kUser} with ID ${kUser.id}`)
    .addField("Kickelte:", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kickelte a csatornában:", message.channel)
    .addField("Idő:", message.createdAt)
    .addField("Oka:", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Nemtalálhato az incidents szoba.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ezt a személyt nem kickelheted!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Bannolt játékos:", `${bUser} with ID ${bUser.id}`)
    .addField("Bannolta:", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Bannolás szobája:", message.channel)
    .addField("Idő:", message.createdAt)
    .addField("Ban oka:", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Nem található az incidents szoba.");

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
    .addField("Jelentett játékos:", `${rUser} with ID: ${rUser.id}`)
    .addField("Jelentette:", `${message.author} with ID: ${message.author.id}`)
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
    .addField("Tempbannolt játékos:", `${cUser} Id-vel ${cUser.id}`)
    .addField("Tempbannolta:", `<@${message.author.id}> Id-val ${message.author.id}`)
    .addField("Tempbannolás Szobája:", message.channel)
    .addField("Ideje:", message.createdAt)
    .addField("Tempbannolás oka:", cReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Nem található az incidents szoba.");

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

bot.login(tokenfile.token);
