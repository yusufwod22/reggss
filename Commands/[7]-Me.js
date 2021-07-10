const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register');
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'me',
    aliases: ['teyitlerim']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {

if(![other.Auth].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 
let Registerr = await Staff.findOne({ Guild: message.guild.id, Admin: message.author.id})
if(!Registerr) return message.channel.send(noem.setDescription(`Herhangi bir kayıtınız bulunamadı lütfen kadın erkek kayıtı yapın.`))
if(Registerr) return message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`
${message.author} (${message.member.roles.highest})
━━━━━━━━━━━━━━━━━━━━
❯ Sunucu İsmi: **\`${message.member.displayName}\`** 
❯ Discord İsmi: **\`${message.author.tag}\`**
❯ Discord Id'si: **\`${message.author.id}\`**  
━━━━━━━━━━━━━━━━━━━━
\`✔️\` ║ Toplam **${Registerr.Total}** kişiyi kayıt etmiş.
\`❤️\` ║ Toplam **${Registerr.Girl}** kişiyi kadın olarak kayıt etmiş.
\`💙\` ║ Toplam **${Registerr.Boy}** kişiyi erkek olarak kayıt etmiş.`))
};

