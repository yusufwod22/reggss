const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register');
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'other.json',
    aliases: ['ayarlanmışlar']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 

 const Ayarlanmışlar = new MessageEmbed()
 .setFooter('Developed By Striga Code')
 .setAuthor(message.guild.name, message.guild.iconURL({dyanmic:true}))
 .setThumbnail(message.guild.iconURL({dyanmic:true}))
 .setDescription(`
 **ROLLER**
 ❯ Kayıt Yetkilisi: ${other.Auth ? `<@&${other.Auth}>` : `Rol Yok`}
 ❯ 1. Erkek Rolü: ${other.e1 ? `<@&${other.e1}>` : `Rol Yok`}
 ❯ 2. Erkek Rolü: ${other.e2 ? `<@&${other.e2}>` : `Rol Yok`}
 ❯ 1. Kız Rolü: ${other.k1 ? `<@&${other.k1}>` : `Rol Yok`}
 ❯ 2. Kız Rolü: ${other.k2 ? `<@&${other.k2}>` : `Rol Yok`}
 **━━━━━━━━━━━━━━━━━━━━**
 ❯ Tag Rolü: ${other.TagRol ? `<@&${other.TagRol}>` : `Rol Yok`}
 ❯ Kayıtsız Rolü: ${other.UnReg ? `<@&${other.UnReg}>` : `Rol Yok`}
 ❯ Booster Rolü: ${other.Booster ? `<@&${other.Booster}>` : `Rol Yok`}

 **KANALLAR**
 ❯ Hoşgeldin Kanalı: ${other.HoşgeldinKanalı ? `<#${other.HoşgeldinKanalı}>`:`Kanal Yok`}
 ❯ Süpheli Kanalı: ${other.ŞüpheliKanalı ? `<#${other.ŞüpheliKanalı}>`:`Kanal Yok`}
 ❯ Tag Kanalı: ${other.TagKanalı ? `<#${other.TagKanalı}>`:`Kanal Yok`}
 `)
message.channel.send(Ayarlanmışlar)
};

