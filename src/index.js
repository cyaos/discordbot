require('dotenv').config();
const {Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, SlashCommandBuilder, ActivityType} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on(Events.ClientReady, (x) => {
    console.log(`${x.user.tag} is ready!`);
    client.user.setActivity({
        name: '/help',
        type: ActivityType.Watching,
    });

    const ping = new SlashCommandBuilder()
    .setName ('ping')
    .setDescription('This is a ping command');

    const hello = new SlashCommandBuilder()
    .setName ('hello')
    .setDescription('This is a hello command')
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('user to say hi to')
        .setRequired(false)
        );
    
    const help = new SlashCommandBuilder()
    .setName ('help')
    .setDescription('Shows a list of commands and information.');

    client.application.commands.create(ping);
    client.application.commands.create(hello);
    client.application.commands.create(help);

});

client.on('interactionCreate', (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName=== 'ping') {
        interaction.reply('Pong!');
    }

    if (interaction.commandName=== 'hello') {
        const userOption = interaction.options.getUser('user')
        if(userOption){
            interaction.reply(`Hello, ${userOption.toString()}!`)
        }
        else {
            interaction.reply('Hello!');
        }
    }


    if (interaction.commandName=== 'help') {
        const embed = new EmbedBuilder()
        .setAuthor({name: 'Standard Commands', iconURL: 'https://cdn.discordapp.com/attachments/1097259565608874157/1205703414638710784/7796-white-ribbon.png?ex=65d955ce&is=65c6e0ce&hm=dfbcb63f80775df71a843560d9f3e0635ccb7e50e2a2c608f2eeb7e40aec3180&'})
        .setDescription('Commands start with `/`')
        .addFields({
            name: 'Fun Commands',
            value: '`hello` | `ping`',
            inline: true,
        },{
            name : 'Moderation',
            value: 'I have not made these yet',
            inline: true,
        },{
            name : 'Utilities',
            value: 'I have not made these yet either',
            inline: true,
        }
        )
        .setColor(0xcdebf9);

        interaction.reply({embeds: [embed]});
    }







});

client.login(process.env.TOKEN);



