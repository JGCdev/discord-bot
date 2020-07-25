module.exports = {
	name: 'saludo',
	description: 'Saludos',
	execute(message, args) {
		message.channel.send('Saludo 1');
	},
};