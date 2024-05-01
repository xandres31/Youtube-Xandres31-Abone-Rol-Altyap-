const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require('../ayarlar.json');

module.exports = async message => {
  
  let xandres = message.xandres;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  let prefix = ayarlar.prefix;
  if (message.content.startsWith(prefix)) {
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = xandres.elevation(message);
  let cmd;
  if (xandres.commands.has(command)) {
    cmd = xandres.commands.get(command);
  } else if (xandres.aliases.has(command)) {
    cmd = xandres.commands.get(xandres.aliases.get(command));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(xandres, message, params, perms);
  }
  }

};
