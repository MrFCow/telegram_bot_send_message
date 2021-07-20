global.env_secured = require("secure-env")({secret:process.env.SECRREET});
const axios = require("axios");

const apiRoot = global.env_secured.TELEGRAM_API_ROOT;
const token = global.env_secured.TOOOKEEN;
const groupChatId = global.env_secured.AUTO_GROUP_ID;

const getMeApiUrl = `${apiRoot}/bot${token}/getMe`;
console.log(`GetMe API: ${getMeApiUrl}`);
axios(getMeApiUrl).then(res => console.log(`getMe = ${JSON.stringify(res.data)}`));

// Ref: https://www.wlsdevelop.com/en/2020/05/10/how-to-find-the-chat_id-of-a-telegram-group/
// First set Group Privacy to off
// this takes a human user to send message in the group
const getUpdateApiUrl = `${apiRoot}/bot${token}/getUpdates`;
console.log(`GetUpdates API: ${getUpdateApiUrl}`);
axios(getUpdateApiUrl).then(res => console.log(`group id = ${res.data.result[0].message.chat.id}`));

// Send Message
const sendMessageApiUrl = `${apiRoot}/bot${token}/sendMessage`;
console.log(`sendMessage API: ${sendMessageApiUrl}`);
const msgData = (text) => {
	return {
		chat_id: Number(groupChatId),
		text: text
	}
};
axios({
	method: "post",
	url: sendMessageApiUrl,
	data: msgData("this is a test from bot"),
	headers: {"Content-Type": "application/json"},
})
.then(res => console.log("Send message OK"))
.catch(err => console.log(err.response && err.response.data))