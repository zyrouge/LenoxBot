const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
exports.run = async(client, msg, args, lang) => {
    const user = msg.mentions.users.first() || msg.author;
    const member = msg.guild.member(user) || await msg.guild.fetchMember(user);
    const userondiscord = moment(user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a');
    const useronserver = moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a');

	const embed = new Discord.RichEmbed()
        .setAuthor(user.tag, user.displayAvatarURL)
        .setColor('#0066CC')
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL)
        .addField(`👤 ${lang.userinfo_user}`, `${user.tag} (${user.id})`)
        .addField(`📥 ${lang.userinfo_created}`, userondiscord)
        .addField(`📌 ${lang.userinfo_joined}`, useronserver)
        .addField(`🏷 ${lang.userinfo_roles}`, member.roles.map(role => role.name).join(', ') || lang.userinfo_noroles)
        .addField(`⌚ ${lang.userinfo_status}`, user.presence.status)
        .addField(`🎮 ${lang.userinfo_playing}`, user.presence.game ? user.presence.game.name : lang.userinfo_nothing);

	msg.channel.send({ embed: embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
    aliases: ['uinfo', 'ui'],
    userpermissions: []
};
exports.help = {
	name: 'userinfo',
	description: 'Gives you information about you or another user',
    usage: 'userinfo [@User]',
    example: ['userinfo @Monkeyyy11#7584'],
	category: 'utility',
    botpermissions: ['SEND_MESSAGES']
};
