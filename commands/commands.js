const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { camoChallengesCommands } = require('../data/camoChallenges');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Check the bot\'s latency'),
    ...camoChallengesCommands  // Import dynamic camo challenge-related commands
];

async function registerCommands(client) {
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands.map(command => command.toJSON()) }
        );
        console.log('Commands registered successfully.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

module.exports = { registerCommands };
