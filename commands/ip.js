module.exports = {
	name: 'ip',
	description: 'IP del servidor',
	execute(message, args) {
		message.channel.send({embed: {
			color: 3447003,
			title: "IP del servidor",
			fields: [{
				name: "234.34.56.12:1200",
				value: "Para acceder abre FiveM, pulsa F8 e introduce la IP"
			  },
			],
			
		  }
		});
	},
};