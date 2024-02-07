require('dotenv').config();
const {Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, SlashCommandBuilder} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on(Events.ClientReady, (x) => {
    console.log(`${x.user.tag} is ready!`);
    client.user.setActivity(`Hihihihi`);

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

    client.application.commands.create(ping);
    client.application.commands.create(hello);

});

client.on('interactionCreate', (interaction) => {

    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName=== 'ping') {
        interaction.reply('Pong!');
    }

    if (interaction.commandName=== 'hello') {
        const userOption = interaction.options.getUser('user')
        interaction.reply('Hello!');
    }



});

client.login(process.env.TOKEN);



