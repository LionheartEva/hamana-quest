var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var Roll = require('roll');
var randomCat = require('random-cat');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {


    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);



        switch(cmd) {
            // !ping
            case 'hola':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hola putito!'
                });
                break;

            case 'Maria':

                var jauriaQuotes = ['Hamana', 'Heniwor', 'Mi-pecho-contra-tu-espalda', 'Son-malas', 'Boguel'];

                var urlWithAllOptions = randomCat.get({
                    dummyText: jauriaQuotes[Math.floor(Math.random() * jauriaQuotes.length)],
                    gray: true
                });

                console.log('maria', urlWithAllOptions);

                bot.sendMessage({
                    to: channelID,
                    message: urlWithAllOptions
                });
                break;

            case 'roll':

                roll = new Roll();

                var dice = roll.roll(args[0]);

                var rolledArray = dice.rolled;
                var calculationsArray = dice.calculations;

                var input = '**Lanzado: **' + args[0];
                var lanzamientos = '**Lanzamientos**: ';
                var calculos = '**Calculos**: ';

                for (var i = 0; i < rolledArray.length; i+=1) {
                    lanzamientos += '(' + rolledArray[i] + ') ';
                }

                for (var i = 0; i < calculationsArray.length; i+=1) {
                    calculos += calculationsArray[i] + ' <- ';
                }

                calculos += '0';

                var reesult = input + "\n" + lanzamientos + "\n" + calculos + "\n" + "**Total**: " + dice.result;

                bot.sendMessage({
                    to: channelID,
                    message: reesult
                });
                break;

            // Just add any case commands if you want to..
        }
    }
});