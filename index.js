require('dotenv').config();
const fs = require('fs');
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(TOKEN);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', member => {
  member.guild.channels.get('channelID').send("Welcome to the server"); 
});

client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ayuda') {
		client.commands.get('ayuda').execute(message, args);
	} else if (command === 'sugerencia') {
		client.commands.get('sugerencia').execute(message, args);
	}
});

// bot.on('message', msg => {
//   console.log('Recibo mensajes');
//   if (msg.content === 'ping') {
//     msg.reply('pong');
//     msg.channel.send('pong');

//   } else if (msg.content.startsWith('!kick')) {
//     if (msg.mentions.users.size) {
//       const taggedUser = msg.mentions.users.first();
//       msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
//     } else {
//       msg.reply('Please tag a valid user!');
//     }
//   }
// });
