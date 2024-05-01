const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");

module.exports = async xandres => {

    xandres.user.setActivity(`xandres`, { type: "PLAYING" });
  xandres.user.setStatus("online");
  console.log("Aktif!")
};

  //LISTENING = DİNLİYOR
  //WATCHING = İZLİYOR
  //PLAYING = OYNUYOR 

//BİLMEYEN VARDIR :)