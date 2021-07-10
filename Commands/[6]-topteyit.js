const { MessageEmbed } = require('discord.js');
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'top-teyit',
    aliases: ['topteyit']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {

    if(![other.Auth].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 

    let TopReg = await Staff.find({ Guild: message.guild.id}).sort({ Total: -1 }).exec();

    if(TopReg < 1) return message.channel.send(noem.setDescription(`Datada yeterli teyit bulunmuyor.`))
    TopReg = TopReg.filter(t => message.guild.members.cache.has(t.Admin)).splice(0, 10);
    message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(TopReg.map((r, i) => `\`${i+1}.\` <@${r.Admin}> ║ Toplam: **${r.Total}** (  Erkek: **${r.Boy}**, Kadın: **${r.Girl}** ) \`🔹\``)))
};
