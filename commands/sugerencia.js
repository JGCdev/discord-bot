module.exports = {
	name: 'sugerencia',
	description: 'Añadir sugerencia al canal',
	execute(message, args) {
		message.channel.send('Sugerencia guardada');
	},
};