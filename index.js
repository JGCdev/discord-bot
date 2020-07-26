require('dotenv').config();
const fs = require('fs');
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bot conectado!');
});

// Comandos de texto
client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ayuda') {
		client.commands.get('ayuda').execute(message, args);
	} else if (command === 'sugerencia') {
		client.commands.get('sugerencia').execute(message, client,  args);
	} else if (command === ''){
		message.channel.send('No has introducido ningún comando después de mi llamada, comandos disponibles:');
		client.commands.get('ayuda').execute(message, args);
	} else {
		message.channel.send('El comando introducido no se encuentra en mi base de datos, adjunto los comandos disponibles:');
		client.commands.get('ayuda').execute(message, args);
	}
});

// Evento entrada usuarios
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenida');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./img/bg.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// ctx.shadowColor = '#d53';
	// ctx.shadowBlur = 20;
	ctx.lineJoin = 'bevel';
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#fff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.shadowColor = "rgba(0,0,0,0.9)";
	ctx.shadowBlur = 10;
	ctx.fillText(`Hola ${member.user.tag}!`, canvas.width / 2.7, canvas.height / 2.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, 'Bienvenid@');
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Bienvenid@`, canvas.width / 2.7, canvas.height / 1.5);
	ctx.shadowBlur = 0;
	ctx.beginPath();
	ctx.arc(125, 125, 75, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 50, 50, 150, 150);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`${member} acaba de llegar a Pecado City! 👋`, attachment);
});

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.login(TOKEN);
