const TCPPortCheck = require('tcp-port-check')

module.exports = {
	name: 'server',
	description: 'Estado del servidor',
	execute(message, args) {
        let checker = new TCPPortCheck({
            getBanner: 512
        })
        checker.check('51.210.6.33', 30120).on('done', (ip, port, result) => {
                console.log(ip, port, result)
                let statusResult = result.opened ? 'ONLINE' : 'OFFLINE';
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "📌 Estado del servidor:",
                        value: statusResult
                      },
                    ],
                  }
                });
        })

	},
};