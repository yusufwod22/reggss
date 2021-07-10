const Discord = require('discord.js')
const client = new Discord.Client({ fetchAllMembers: true})
const {readdir} = require('fs')
const moment = require('moment')
require("moment-duration-format");
require("moment-timezone");
const mongoose = require('mongoose')
const Main = require('./Main.json')
const Other = require('./Other.json')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Set();

client.on('ready', async () => { 
client.user.setActivity(`${Main.CustomStatus}`, { type: "STREAMING", url: "https://www.twitch.tv/raviwen"})
.then(console.log('[+] - '+ client.user.tag +' ismiyle API\'ye bağlanıldı ve bot hazır durumda.'))
.catch(() => console.log('[-] Aga bi botu kontrol etsene satır 11 den 15 kadar takıl işte.'));
client.channels.cache.get(Main.BotVoice)
.join()
.catch(() => console.log(`[-] Bot ses kanalına bağlanamadı.`))
}); 

readdir('./Commands', (err, files) => { 
files.forEach(fs => { 
let command = require(`./Commands/${fs}`); 
client.commands.set(command.config.name, command);
if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
});
});

readdir('./Events', (err,files) => {
if(err) return console.log(err);
files.filter(events => events.endsWith('.js')).forEach(events => {
let eventload = require(`./Events/${events}`);
if(!eventload.configuration) return console.log(`[E] ${events} Başlatılıyor.`);
client.on(eventload.configuration.name,  eventload)
})});
  
client.on('message', async message => {
let noem = new Discord.MessageEmbed().setColor('RED').setFooter('Developed by Striga Code').setTimestamp() 
let yeem = new Discord.MessageEmbed().setColor('GREEN').setFooter('Developed by Striga Code').setTimestamp() 
if (!message.guild || message.author.bot || message.channel.type === 'dm') return;
let prefix = Main.Prefix.filter(p => message.content.startsWith(p))[0]; 
if (!prefix) return;
let main = Main;
let other = Other;
let args = message.content.split(' ').slice(1);
let command = message.content.split(' ')[0].slice(prefix.length); 
let load = client.commands.get(command) || client.commands.get(client.aliases.get(command));
if (load){
if (!message.member.hasPermission(8) && client.cooldown.has(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setDescription('**5** Saniyede bir komut kullanabilirsin.').setFooter('Developed by Raviwen').setColor('RANDOM').setTimestamp());
client.cooldown.add(message.author.id);
setTimeout(() => client.cooldown.delete(message.author.id), 5000);
load.raviwen(client, message, args, main, other, noem, yeem);
}
});

  
client.login(Main.Token).catch(() => console.log(`[-] Bota giriş yapılırken bir hata oluştu.`))
mongoose.connect(Main.MongoURL, {  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

let aylartoplam = {"01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık"};
global.aylar = aylartoplam;
const tarihsel = global.tarihsel = function(tarih) {
let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
return tarihci};
const sayilariCevir = global.sayilariCevir = function(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")};
const tarihhesapla = global.tarihHesapla = (date) => {
const startedAt = Date.parse(date);
var msecs = Math.abs(new Date() - startedAt);
const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365)); msecs -= years * 1000 * 60 * 60 * 24 * 365; const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30)); msecs -= months * 1000 * 60 * 60 * 24 * 30; const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7)); msecs -= weeks * 1000 * 60 * 60 * 24 * 7; const days = Math.floor(msecs / (1000 * 60 * 60 * 24)); msecs -= days * 1000 * 60 * 60 * 24; const hours = Math.floor(msecs / (1000 * 60 * 60)); msecs -= hours * 1000 * 60 * 60; const mins = Math.floor((msecs / (1000 * 60))); msecs -= mins * 1000 * 60; const secs = Math.floor(msecs / 1000); msecs -= secs * 1000;
var string = ""; if (years > 0) string += `${years} yıl`; else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`; else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`; else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`; else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`; else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`; else if (secs > 0) string += `${secs} saniye`; else string += `saniyeler`; string = string.trim(); return `${string} önce`;};


client.on('userUpdate', async(oldUser, newUser) => {
  let guild = client.guilds.cache.get(Main.Guild);
  if(!guild) return;
  let member = guild.members.cache.get(oldUser.id);
  if(!member);
  if(newUser.username.includes(Main.sunucuTag) && !member.roles.cache.has(Other.TagRol)){
  await member.roles.add(Other.TagRol).catch(() => console.log('Tag Rolü Verilemedi.'))
  await guild.channels.cache.get(Other.TagKanalı).send(new Discord.MessageEmbed().setAuthor(`Tag Alarak Ailemize Katıldı.`).setDescription(`${member} adlı üye \`${Main.sunucuTag}\` tagımızı aldı.`).setColor("GREEN").setTimestamp().setFooter(`Developed By Striga Code.`));
} else   if(!newUser.username.includes(Main.sunucuTag) && member.roles.cache.has(Other.TagRol)){ 
  await member.roles.cache.has(Other.Booster) ? member.roles.set([Other.Booster, Other.UnReg]) : member.roles.set([Other.UnReg])
  await guild.channels.cache.get(Other.TagKanalı).send(new Discord.MessageEmbed().setAuthor(`Tagımızı Bıraktı.`).setDescription(`${member} adlı üye \`${Main.sunucuTag}\` tagımızı bıraktı.`).setColor("RED").setTimestamp().setFooter(`Developed By Striga Code.`));
}  

})