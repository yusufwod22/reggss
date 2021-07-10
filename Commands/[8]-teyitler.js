const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register');
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'teyitler',
    aliases: ['teyitlerim']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {

    if(![other.Auth].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!member.roles.cache.get(other.Auth) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription(`Belirtilen üye veya siz kayıt yetkilisi değilsiniz.`))
    let Registerr = await Staff.findOne({ Guild: message.guild.id, Admin: member.id})
    if(!Registerr) { let RegistererData = new Staff({ Guild: message.guild.id, Admin: member.id, Total: 0, Girl: 0, Boy: 0}).save()
    .then(r => { return message.channel.send(noem.setDescription(`${member} Adlı üyenin kaydı bulunmuyor.`))} )}
     else { message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`
     ${member} (${member.roles.highest})
     ━━━━━━━━━━━━━━━━━━━━
     ❯ Sunucu İsmi: **\`${member.displayName}\`** 
     ❯ Discord İsmi: **\`${member.user.tag}\`**
     ❯ Discord Id'si: **\`${member.id}\`**  
     ━━━━━━━━━━━━━━━━━━━━
     \`✔️\` ║ Toplam **${Registerr.Total}** kişiyi kayıt etmiş.
     \`❤️\` ║ Toplam **${Registerr.Girl}** kişiyi kadın olarak kayıt etmiş.
     \`💙\` ║ Toplam **${Registerr.Boy}** kişiyi erkek olarak kayıt etmiş.`)) }

};
