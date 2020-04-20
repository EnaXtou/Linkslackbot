const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: "jirabot"
});

bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    };

    bot.postMessageToChannel(
        'test-channel',
        'http://google.com',
        params
    );
});

bot.on('message', function(data) {
    const jiraRegexp = /CP-[0123456789]{4}/g;
    let ticketNumber;
    if (data.text && data.username !== "jirabot"
        &&  (ticketNumber = data.text.toString().match(jiraRegexp))) { //assign and evaluate if regex match the text
        console.log(data);
        let ticketNumber = data.text.toString().match(/CP-[0123456789]{4}/ig);
        let params = {
            thread_ts: data["ts"]
        };
        for(let i = 0; i < ticketNumber.length; i++) {
            bot.postMessageToChannel(
                'test-channel',
                "https://fujira.csin.cz/browse/" + ticketNumber[i],
                params
            );
            params = {
                as_user: true,
                user: data["user"]
            };
            let promise = bot.updateMessage(data["channel"], data["ts"],"https://fujira.csin.cz/browse/" + ticketNumber[i], params);
            promise.then(
                result => console.log(result),
                error => console.error(error)
            );
        }
    }
});

   /* if (data.text && data.username !== "jirabot" &&
        data.text.toString().match("RE-[1234567890]{4}")) {
        let ticketNumber = data.text.toString().match(/CP-[0123456789]{4}/g);
        console.log(ticketNumber);
        console.log(ticketNumber.length);
        for(let i = 0; i < ticketNumber.length; i++) {
            let params = {
                icon_emoji: ':robot_face:'
            };
            /!*let promise = bot.postMessageToChannel(data["channel"], "https://fujira.csin.cz/browse/" + ticketNumber[i], params);
            promise.then(
                    result => console.log(result),
                    error => console.log(error)
            );*!/
            bot.postMessageToChannel(
                'test-channel',
                'http://google.com',
                null
            );
            console.log("https://fujira.csin.cz/browse/" + ticketNumber[i]);
        }
    }*/


/*
if(data.text && data.username != "jirabot") {
           console.log(data.text);
           console.log(data.username);
       };

       if (data.text && data.username != "jirabot" &&
           data.text.toString().match("RE-[1234567890]{4}")){
           var ticketNumber = data.text.toString().match(/RE-[0123456789]{4}/g);
           console.log(ticketNumber);
           for(var i = 0; i++; i < ticketNumber.length) {
               console.log("https://fujira.csin.cz/browse/" + ticketNumber[i]);
           }

           bot.postMessageToChannel(
               'test-channel',
               'https://fujira.csin.cz/browse/' + data.text

           );
       };
 */

