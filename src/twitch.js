require = require("esm")(module/*, options*/)
const tmi = require('tmi.js');

const { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME } = require('./constants');

const options = {
    options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ] 
}

let twitchClient = null;

exports.connectTwitchClient = () => {
	twitchClient = new tmi.Client(options);
	twitchClient.connect().catch(console.error);
	
	twitchClient.on('message', (channel, userstate, message, self) => {
		if(self) return;
		if(message.toLowerCase() === '!hello') {
			client.say(channel, `@${userstate.username}, heya!`);
		}
	});

	return twitchClient;
}

exports.getTwitchClient = () => {
	return twitchClient;
}