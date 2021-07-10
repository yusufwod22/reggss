const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register')
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'isim',
    aliases: ['i','isim-değiştir']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {
if(![other.Auth].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 
let Name = args[1]
let Age = args[2]
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(noem.setDescription(`Bir üye belirtmen gerekiyor.`));
if(!Name || !Age ) return message.channel.send(noem.setDescription(`Yanlış kullanım. ${main.Prefix}isim <@Raviwen/ID> <İsim> <Yaş>`));
if(member.id === message.author.id) return message.channel.send(noem.setDescription('Kendinizi kayıt edemezsiniz.'))
if(member.id === message.guild.ownerID ) return message.channel.send(noem.setDescription('Sunucu sahibini kayıt edemezsin.'))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(noem.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))

const FuckBoy = `${member.user.username.includes(main.sunucuTag) ? main.sunucuTag : main.SunucuUnTag} ${Name} | ${Age}`

let datasaver = new Register({ User: member.id,  Role: `İsim Değişikliği`, Date: Date.now(), userNames: FuckBoy}); 
datasaver.save().catch(() => console.log(`İsim Datası Kayıt Edilirken Sorun Yaşandı.`))

await member.setNickname(FuckBoy)
message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(`${member} üyesinin ismi "${FuckBoy}" olarak ${message.author} tarafından güncellendi.`))
};