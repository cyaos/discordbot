require('dotenv').config();
const {Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, SlashCommandBuilder, ActivityType, ActionRow, MessageComponentInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, InteractionResponse, InteractionCollector} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on(Events.ClientReady, (x) => {
    console.log(`${x.user.tag} is ready!`);

    const activities = [
        {
            name: '/help',
            type: ActivityType.Watching,
        },
        {
            name: 'Work in progress...',
            type: ActivityType.Playing,
        },
        {
            name: 'Testing...',
            type: ActivityType.Listening,
        }
    ]

    setInterval(() => {
        const random = Math.floor(Math.random()*activities.length);
        client.user.setActivity(activities[random]);
    }, 10000)
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

    const poll = new SlashCommandBuilder()
    .setName ('poll')
    .setDescription ('This command will create a poll')
    .addStringOption(option =>
        option
        .setName('question')
        .setDescription('What is the poll about?')
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('choice1')
        .setDescription('Poll choice')
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('choice2')
        .setDescription('Poll choice')
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('choice3')
        .setDescription('Poll choice')
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName('choice4')
        .setDescription('Poll choice')
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName('choice5')
        .setDescription('Poll choice')
        .setRequired(false)
        )
    .addStringOption(option =>
        option
        .setName('choice6')
        .setDescription('Poll choice')
        .setRequired(false)
        );


    client.application.commands.create(ping);
    client.application.commands.create(hello);
    client.application.commands.create(help);
    client.application.commands.create(poll);

});

client.on('interactionCreate', async (interaction) => {

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


    if (interaction.commandName === 'poll'){
        const Usermessage = interaction.options.getString('question');
        const choice1 = interaction.options.getString('choice1');
        const choice2 = interaction.options.getString('choice2');
        const choice3 = interaction.options.getString('choice3');
        const choice4 = interaction.options.getString('choice4');
        const choice5 = interaction.options.getString('choice5');
        const choice6 = interaction.options.getString('choice6');

        const embedPoll = new EmbedBuilder()
        .setTitle(`${Usermessage}`);
        
        if (choice3 === null){
            embedPoll.setDescription(`> <:w_number_1:1205788993556324373> ${choice1}\n> <:w_number_2:1205789037126754385> ${choice2}`)
        } 
        else if (choice4 === null){
            embedPoll.setDescription(`<:w_number_1:1205788993556324373> ${choice1}\n<:w_number_2:1205789037126754385> ${choice2}\n<:w_number_3:1205789065392164885> ${choice3}`)
        }
        else if (choice5 === null){
            embedPoll.setDescription(`<:w_number_1:1205788993556324373> ${choice1}\n<:w_number_2:1205789037126754385> ${choice2}\n<:w_number_3:1205789065392164885> ${choice3}\n<:w_number_4:1205789094475464755> ${choice4}`)
        }
        else if (choice6 === null){
            embedPoll.setDescription(`<:w_number_1:1205788993556324373> ${choice1}\n<:w_number_2:1205789037126754385> ${choice2}\n<:w_number_3:1205789065392164885> ${choice3}\n<:w_number_4:1205789094475464755> ${choice4}\n<:w_number_5:1205789161702031381> ${choice5}`)   
        } else {
            embedPoll.setDescription(`<:w_number_1:1205788993556324373> ${choice1}\n<:w_number_2:1205789037126754385> ${choice2}\n<:w_number_3:1205789065392164885> ${choice3}\n<:w_number_4:1205789094475464755> ${choice4}\n<:w_number_5:1205789161702031381> ${choice5}\n<:w_number_6:1205789122434826281> ${choice6}`)
        }

        interaction.reply({
            embeds: [embedPoll],
        });


        const messagePoll = await interaction.fetchReply();
        if (choice3 === null){
            messagePoll.react('<:w_number_1:1205788993556324373>')
            messagePoll.react('<:w_number_2:1205789037126754385>')
        } 
        else if (choice4 === null){

        }
        else if (choice5 === null){

        }
        else if (choice6 === null){

        }
        else {

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

        const buttonembed = new EmbedBuilder()
        .setDescription('BUTTON WORKS');

        const tester = new ButtonBuilder()
        .setCustomId('tester')
        .setLabel('TESTING BUTTON')
        .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
        .addComponents(tester);

        const response = await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true,
        });

        const confirmation = await response.awaitMessageComponent({time: 60_000});

        if (confirmation.customId === 'tester'){
            await confirmation.update({
                embeds:[buttonembed],
                components: [],
                ephemeral: true,
            });
        }
    }

});



client.login(process.env.TOKEN);



