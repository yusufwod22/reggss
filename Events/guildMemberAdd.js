const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const moment = require('moment')
require("moment-duration-format");
require("moment-timezone");
const other = require('../Other.json')
const main = require('../Main.json')

module.exports = async (member) => {
let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
if(guvenilirlik) {
member.roles.remove(other.UnReg)        
member.roles.add(other.Şüpheli)    
member.guild.channels.cache.get(other.ŞüpheliKanalı).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic:true})).setDescription(`• ${member} adlı üyenin hesabı yeni açıldığı için tüm rollerini aldım ve <@&${other.Şüpheli}> verdim.`).setTimestamp().setColor('RANDOM'))
} else {     
ServerHg(member)
member.roles.add(other.UnReg)
}

if(member.user.username.includes(main.sunucuTag)){
    await member.roles.add(other.TagRol)
    member.guild.channels.cache.get(other.TagKanalı).send(new MessageEmbed().setColor('RANDOM').setDescription(`${member} Aramıza doğutan taglı şekilde katıldı.`))
}

}
module.exports.configuration = {name: "guildMemberAdd"}

function ServerHg(member) {
let yazı = "Aramıza Katıldı !"    
member.guild.channels.cache.get(other.HoşgeldinKanalı).send(new MessageEmbed()
.setTitle(`<a:starbutstrigaa:854863510043754496> ${member.user.username} ${yazı} <a:starbutstrigaa:854863510043754496>`)
.setDescription(`
<a:starbutstrigaa:854863510043754496> Sunucumuza hoş geldin ${member} (\`${member.id}\`)\n
<a:starbutstrigaaa:854863510533832724> Hesabın **${global.tarihsel(member.user.createdAt)}** tarihinde (${global.tarihHesapla(member.user.createdAt)}) oluşturulmuş.\n
<a:ravi_onay:840782106614956032> Sunucumuzun kurallarına <#840780506341441597> göz atmanız tavsiye ederiz ceza işlemlerini kurallara göre yapıyoruz.\n
<a:strigabutbook:854863510998351873> Sunucumuza Kayıt olmak için solda ki odalara girip ses teyit vererek kayıt olabilirsin.\n
<a:strigabutalevgibi:854863510794534934> Seninle birlikte sunucumuz **${member.guild.memberCount}** kişi oldu ! Tagımızı (**${main.sunucuTag}**) alarak ailemizin bir parçası olabilirsin.`)
.setImage(`https://cdn.discordapp.com/attachments/790249620181352519/854869399167828019/7c28a5acf8ab00ace184d76c112ce268.png`)
.setColor('RANDOM'))}