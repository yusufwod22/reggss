const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register');
const Staff = require('../Models/Staff');

module.exports.config = { 
    name: 'k',
    aliases: ['kadın','girl']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {
if(![other.Auth].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noem.setDescription('Gerekli yetkilere sahip değilsin.')) 
let Name = args[1]
let Age = args[2]
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(noem.setDescription(`Bir üye belirtmen gerekiyor.`));
if(!Name || !Age ) return message.channel.send(noem.setDescription(`Yanlış kullanım. ${main.Prefix}k <@Raviwen/ID> <İsim> <Yaş>`));
if(member.id === message.author.id) return message.channel.send(noem.setDescription('Kendinizi kayıt edemezsiniz.'))
if(member.id === message.guild.ownerID ) return message.channel.send(noem.setDescription('Sunucu sahibini kayıt edemezsin.'))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(noem.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))

const FuckBoy = `${member.user.username.includes(main.sunucuTag) ? main.sunucuTag : main.SunucuUnTag} ${Name} | ${Age}`

let datasaver = new Register({User: member.id,Role: `<@&${other.k1}>`, Date: Date.now(), userNames: FuckBoy}); 
datasaver.save().catch(() => console.log(`Kadın Datası Kayıt Edilirken Sorun Yaşandı.`))

Staff.findOne({ Admin: message.author.id}, async (err, data) => { if(!data) { let staffdata = new Staff({ Guild: message.guild.id, Admin: message.author.id, Total: 1, Girl: 1, Boy: 0 }); staffdata.save(); } else { data.Total = data.Total+1; data.Girl = data.Girl+1; data.save(); }})


await member.setNickname(FuckBoy)
await member.roles.add(other.k1)
await member.roles.add(other.k2)
await member.roles.remove(other.UnReg)

Register.find({User: member.id}, async(err, data) => {
    if(data) {
    let striga = data.reverse().reverse()
    let page = 1;
    let isimler = striga.map(x => `\`${x.userNames}\` | (${x.Role})`)
   var strigalamacool = (`
   ${isimler.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n")}`)
   message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(`${member} üyesinin ismi "${FuckBoy}" olarak güncellendi **Kadın** rolleri verildi.
   \n \`Kullanıcının geçmiş 5 adet ismi;\` \n ${strigalamacool}`))
   } else {
    message.channel.send(yeem.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(`${member} üyesinin ismi "${FuckBoy}" olarak güncellendi **Kadın** rolleri verildi.`))
}})
};