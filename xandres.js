const Discord = require("discord.js");
const xandres = new Discord.xandres();
const ayarlar = require("./ayarlar.json");
const { xandres, Util } = require("discord.js");
const fs = require("fs");//xandres31
require("./util/eventLoader")(xandres);//xandres31

//xandres31
const log = message => {
  console.log(`${message}`);
};
//xandres31

//xandres31
xandres.commands = new Discord.Collection();
xandres.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    xandres.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      xandres.aliases.set(alias, props.help.name);
    });
  });
});
//xandres31
xandres.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      xandres.commands.delete(command);
      xandres.aliases.forEach((cmd, alias) => {
        if (cmd === command) xandres.aliases.delete(alias);
      });
      xandres.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        xandres.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

xandres.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);//xandres31
      xandres.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        xandres.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//xandres31
xandres.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      xandres.commands.delete(command);
      xandres.aliases.forEach((cmd, alias) => {
        if (cmd === command) xandres.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);//xandres31
    }
  });//xandres31
};//xandres31

xandres.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.permissions.has("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 4;
  return permlvl;
};//xandres31

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

xandres.login(ayarlar.token);
const moment = require('moment');
moment.locale('tr');//xandres31
const { S_IFREG } = require("constants");
const data = require('quick.db');
const logs = require('discord-logs');
logs(xandres);


xandres.on('ready', async () => {
xandres.user.setStatus('online');
console.log(`${xandres.user.username} ismiyle bağlandım.`);
})
//xandres31
xandres.on('message', async message => {
if(message.channel.type !== 'text') return;
const datas = await data.fetch(`tag.${message.guild.id}`);
if(message.content.toLowerCase().toString().includes('tag')) {
if(datas) return message.channel.send('`'+datas+'`');
};
});





xandres.on('message', async message => {
  if(message.channel.type !== 'text') return;
const xandresed = await data.fetch(`xandresed.${message.guild.id}`);
if(!xandresed) return;
let command = xandresed.find(a => a.command === message.content.toLocaleLowerCase());
if(command) {
message.channel.send(`${message.author} ${command.respond}`);
};
});





xandres.login(ayarlar.token);
