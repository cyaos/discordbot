require('dotenv').config();
const {Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, SlashCommandBuilder, ActivityType, ActionRow, MessageComponentInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, InteractionResponse, InteractionCollector, ComponentType} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on(Events.ClientReady, (x) => {
    console.log(`${x.user.tag} is ready!`);

    const activities = [
        {
            name: '/help',
            type: ActivityType.Listening,
        },
        {
            name: 'Work in progress...',
            type: ActivityType.Listening,
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

    const mute = new SlashCommandBuilder()
    .setName ('mute')
    .setDescription ('Mutes the desired member')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('user to mute')
        .setRequired(true)
        )
    .addIntegerOption(option =>
        option
        .setName('duration')
        .setDescription('mute duration in seconds')
        .setRequired(true)
        )
    
    
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

        const jackie = new SlashCommandBuilder()
        .setName ('jackie')
        .setDescription('Try and see!!!!');

    client.application.commands.create(ping);
    client.application.commands.create(hello);
    client.application.commands.create(help);
    client.application.commands.create(poll);
    client.application.commands.create(jackie);
    client.application.commands.create(mute);

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
        .setTitle(`**${Usermessage}**`)
        .setColor(0x738678);
        
        if (choice3 === null){
            embedPoll.setDescription(`> <:w_number_1:1205788993556324373> ${choice1}\n> <:w_number_2:1205789037126754385> ${choice2}`)
        } 
        else if (choice4 === null){
            embedPoll.setDescription(`> <:w_number_1:1205788993556324373> ${choice1}\n> <:w_number_2:1205789037126754385> ${choice2}\n> <:w_number_3:1205789065392164885> ${choice3}`)
        }
        else if (choice5 === null){
            embedPoll.setDescription(`> <:w_number_1:1205788993556324373> ${choice1}\n> <:w_number_2:1205789037126754385> ${choice2}\n> <:w_number_3:1205789065392164885> ${choice3}\n> <:w_number_4:1205789094475464755> ${choice4}`)
        }
        else if (choice6 === null){
            embedPoll.setDescription(`> <:w_number_1:1205788993556324373> ${choice1}\n> <:w_number_2:1205789037126754385> ${choice2}\n> <:w_number_3:1205789065392164885> ${choice3}\n> <:w_number_4:1205789094475464755> ${choice4}\n> <:w_number_5:1205789161702031381> ${choice5}`)   
        } else {
            embedPoll.setDescription(`> <:w_number_1:1205788993556324373> ${choice1}\n> <:w_number_2:1205789037126754385> ${choice2}\n> <:w_number_3:1205789065392164885> ${choice3}\n> <:w_number_4:1205789094475464755> ${choice4}\n> <:w_number_5:1205789161702031381> ${choice5}\n> <:w_number_6:1205789122434826281> ${choice6}`)
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
            messagePoll.react('<:w_number_1:1205788993556324373>')
            messagePoll.react('<:w_number_2:1205789037126754385>')
            messagePoll.react('<:w_number_3:1205789065392164885>')
        }
        else if (choice5 === null){
            messagePoll.react('<:w_number_1:1205788993556324373>')
            messagePoll.react('<:w_number_2:1205789037126754385>')
            messagePoll.react('<:w_number_3:1205789065392164885>')
            messagePoll.react('<:w_number_4:1205789094475464755>')
        }
        else if (choice6 === null){
            messagePoll.react('<:w_number_1:1205788993556324373>')
            messagePoll.react('<:w_number_2:1205789037126754385>')
            messagePoll.react('<:w_number_3:1205789065392164885>')
            messagePoll.react('<:w_number_4:1205789094475464755>')
            messagePoll.react('<:w_number_5:1205789161702031381>')
        }
        else {
            messagePoll.react('<:w_number_1:1205788993556324373>')
            messagePoll.react('<:w_number_2:1205789037126754385>')
            messagePoll.react('<:w_number_3:1205789065392164885>')
            messagePoll.react('<:w_number_4:1205789094475464755>')
            messagePoll.react('<:w_number_5:1205789161702031381>')
            messagePoll.react('<:w_number_6:1205789122434826281>')
        }

    }

    if (interaction.commandName=== 'help') {
        const embed = new EmbedBuilder()
        .setAuthor({name: 'Standard Commands', iconURL: 'https://cdn.discordapp.com/attachments/1097259565608874157/1205703414638710784/7796-white-ribbon.png?ex=65d955ce&is=65c6e0ce&hm=dfbcb63f80775df71a843560d9f3e0635ccb7e50e2a2c608f2eeb7e40aec3180&'})
        .setDescription('Commands start with `/`')
        .addFields({
            name: 'Fun Commands',
            value: '`hello` | `ping` | `jackie`',
            inline: true,
        },{
            name : 'Moderation',
            value: '`mute`',
            inline: true,
        },{
            name : 'Utilities',
            value: '`poll`',
            inline: true,
        }
        )
        .setColor(0x738678);

        const buttonembed = new EmbedBuilder()
        .setDescription('BUTTON WORKS');

        const tester = new ButtonBuilder()
        .setCustomId('tester')
        .setLabel('TESTING BUTTON')
        .setStyle(ButtonStyle.Primary);

        const second = new ButtonBuilder()
        .setCustomId('second')
        .setLabel('SECOND BUTTON')
        .setStyle(ButtonStyle.Danger);

        const row1 = new ActionRowBuilder()
        .addComponents(tester);

        const row2 = new ActionRowBuilder()
        .addComponents(second);

        const response = await interaction.reply({
            embeds: [embed],
            components: [row1],
            ephemeral: true,
            
        });

        const collectorfilter = (i) => i.user.id === interaction.user.id;

        try {
            const collector = response.createMessageComponentCollector({
                filter: collectorfilter,
                time: 60_000
            });
            collector.on('collect', (collector) => {
                if (collector.customId === 'tester'){
                    collector.update({
                        embeds:[buttonembed],
                        components: [row2],
                        ephemeral: true,
                    })
                }
        
                if (collector.customId === 'second'){
                    collector.update({
                        embeds:[embed],
                        components: [row1],
                        ephemeral: true,
                })
                }
            })
        } catch (e){
            await interaction.editReply({content: 'no buttons pressed :(', components: []})
        }
    }
    
    if (interaction.commandName === 'jackie'){
        interaction.user.send("HAPPY BIRTHDAY JACKIE");
    }

    if (interaction.commandName === 'mute'){
        const member = interaction.options.getMember('user');
        const time = interaction.options.getInteger('duration');
        member.timeout(time*1000);
        interaction.reply(`${member} has been muted`);
    }
});

client.login(process.env.TOKEN);



