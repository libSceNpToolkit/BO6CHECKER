const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { registerCommands } = require('./commands/commands');
const { handleInteraction } = require('./handler/interactionHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Bot Initialization
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    registerCommands(client);  // Register commands once the bot is ready
});

// Interaction Handling
client.on('interactionCreate', async (interaction) => {
    await handleInteraction(interaction);
});

// Login to Discord
client.login(process.env.BOT_TOKEN);