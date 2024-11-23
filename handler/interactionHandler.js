const { EmbedBuilder } = require('discord.js');
const camoChallenges = require('../data/camoChallengesData'); // Load camo challenges from external data

async function handleInteraction(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.reply(`Pong! Latency: ${latency}ms`);
    }

    if (commandName === 'check') {
        const mode = options.getString('mode');
        const category = options.getString('category');
        const weapon = options.getString('weapon');

        if (camoChallenges[mode] && camoChallenges[mode][category]) {
            const categoryData = camoChallenges[mode][category];
            const defaultCamos = categoryData.default.map(camo => `${camo.name}: ${camo.challenge}`).join('\n');
            const uniqueCamos = (categoryData.unique[weapon] || ['No unique challenge available']).join('\n');
            const masteryCamos = Object.entries(categoryData.mastery)
                .map(([name, challenge]) => `${name.charAt(0).toUpperCase() + name.slice(1)}: ${challenge}`)
                .join('\n');

            const embed = new EmbedBuilder()
                .setTitle(`Camo Challenges for ${weapon.toUpperCase()}`)
                .setColor('#00ff00')
                .addFields(
                    { name: 'Default Camos', value: defaultCamos },
                    { name: 'Unique Camos', value: uniqueCamos },
                    { name: 'Mastery Camos', value: masteryCamos }
                );

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply('Camo challenges not found for the given mode or category.');
        }
    }
}

module.exports = { handleInteraction };