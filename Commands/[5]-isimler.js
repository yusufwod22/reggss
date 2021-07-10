const { MessageEmbed } = require('discord.js');
const Register = require('../Models/Register')
const Staff = require('../Models/Staff')

module.exports.config = { 
    name: 'isimler',
    aliases: ['history','geçmiş']
}

module.exports.raviwen = async(client, message, args, main, other, noem, yeem) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send(noem.setDescription(`Lütfen bir kullanıcı belirtin.`)).then(x => x.delete({timeout:6500}))
    Register.find({User: member.id}, async(err, data) => {
    if(err) return console.log(err)
    if(data.length < 1) return message.channel.send(noem.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription(`${member} adlı kullanıcının veritabanında bir kayıtı yok.`)).then(x => x.delete({timeout:6500}))
    var page = 1;
    let striga = data.reverse().reverse()
    let isimler = striga.map(x => `\`${x.userNames}\` | (${x.Role})`)
        
    var strigalamacool = await message.channel.send(yeem.setDescription(`
    ${member} adlı üyenin toplam **${data.length}** tane ismi bulundu aşağıya listeledim.
    
    ${isimler.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n")}`))
    
    
    if (isimler.length > 10) {
    await strigalamacool.react(`◀`);
    await strigalamacool.react(`🔴`);
    await strigalamacool.react(`▶`);
    
    let collector = strigalamacool.createReactionCollector((react, user) => ["◀", "🔴", "▶"].some(e => e == react.emoji.name) && user.id == message.member.id, {time: 200000});
    
    collector.on("collect", (react, user) => {
    if (react.emoji.name == "▶") {
    if (isimler.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return; page += 1;
    let ileriIsimler = isimler.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
    strigalamacool.edit(yeem.setDescription(`
    ${member} adlı üyenin toplam **${data.length}** tane ismi bulundu aşağıya listeledim.
    
    ${ileriIsimler}`))
    }
    
    if (react.emoji.name == "◀") {
    if (isimler.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
    page -= 1;
    let geriIsimler = isimler.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
    strigalamacool.edit(yeem.setDescription(`
    ${member} adlı üyenin toplam **${data.length}** tane ismi bulundu aşağıya listeledim.
    
    ${geriIsimler}`))
    }
    if (react.emoji.name == "🔴") {
        strigalamacool.delete();
    collector.stop();
    }})}});
};

