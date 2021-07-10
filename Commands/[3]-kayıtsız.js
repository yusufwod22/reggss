const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register')
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'kayıtsız',
    aliases: ['unreg']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {
if(![other.Auth].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(noem.setDescription(`Bir üye belirtmen gerekiyor.`));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(noem.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))

await member.setNickname(member.user.username);
await member.roles.cache.has(other.Booster) ? member.roles.set([other.Booster, other.UnReg]) : member.roles.set([other.UnReg])
message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(`${member} adlı üyenin tüm rolleri alındı ve <@&${other.UnReg}> verildi`))
};