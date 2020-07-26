module.exports = {
	name: 'ayuda',
	description: 'Comandos de ayuda',
	execute(message, args) {
		message.channel.send({embed: {
			color: 3447003,
			description: "¿Cómo puedo ayudarte?",
			fields: [{
				name: "!bot server",
				value: "Comprueba el estado del servidor"
			  },
			  {
				name: "!bot sugerencia *tusugerencia*",
				value: "Crea tu sugerencia en cualquier canal y yo me encargaré de ordenarla"
			  },
			  {
				name: "!bot donacion",
				value: "Relacionado con donaciones"
			  }
			],
			
		  }
		});
	},
};