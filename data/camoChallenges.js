const { SlashCommandBuilder } = require('discord.js');
const camoChallenges = require('./camoChallengesData');

// Dynamically create the check command
const camoChallengesCommands = [
    new SlashCommandBuilder()
        .setName('check')
        .setDescription('Check camo challenges')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Game mode')
                .setRequired(true)
                .addChoices(
                    { name: 'Multiplayer', value: 'multiplayer' },
                    { name: 'Zombies', value: 'zombies' },
                    { name: 'Warzone', value: 'warzone' }
                ))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Weapon category')
                .setRequired(true)
                .addChoices(
                    { name: 'AR', value: 'ar' },
                    { name: 'SMG', value: 'smg' },
                    { name: 'Shotgun', value: 'shotgun' },
                    { name: 'LMG', value: 'lmg' },
                    { name: 'Rifle', value: 'rifle' },
                    { name: 'Sniper', value: 'sniper' },
                    { name: 'Pistol', value: 'pistol' },
                    { name: 'Melee', value: 'melee' },
                    { name: 'Special', value: 'special' },
                    { name: 'Launchers', value: 'launchers' }
                ))
        .addStringOption(option =>
            option.setName('weapon')
                .setDescription('Select Weapon')
                .setRequired(true)
                .addChoices(...getWeaponChoices())  // Add weapons dynamically here
        )
];

function getWeaponChoices() {
    const weapons = Object.keys(camoChallenges.zombies).flatMap(category => {
        return Object.keys(camoChallenges.zombies[category].unique).map(weapon => ({
            name: weapon.toUpperCase(),
            value: weapon
        }));
    });
    return weapons;
}

module.exports = { camoChallengesCommands };