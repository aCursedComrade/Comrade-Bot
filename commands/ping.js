import { SlashCommandBuilder, userMention } from 'discord.js';
import logger_func from '../logger.js';
const logger = new logger_func();

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 */
export async function handler(interaction) {
  const funni = 'https://tenor.com/view/bonk-gif-19410756';
  await interaction.reply('Pong! :ping_pong: ...');
  logger.log(`/${data.name} command done`);
  setTimeout(async () => {
    await interaction.followUp({ content: `${userMention(interaction.user.id)} [BONK!](${funni})`, ephemeral: true });
  }, 5000);
}

export default data;