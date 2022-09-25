import { ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';
import axios from 'axios';
import logger_func from '../logger.js';
const logger = new logger_func();

// why did i make this

const data = new ContextMenuCommandBuilder()
  .setName('UwUify')
  .setType(ApplicationCommandType.Message);
/**
 * @param {import('discord.js').MessageContextMenuCommandInteraction} interaction
 */
export async function handler(interaction) {
  interaction.deferReply();
  const uwuapi = 'https://uwuaas.herokuapp.com/api/';
  const body = { 'text': interaction.targetMessage.content };
  await axios.post(uwuapi, body)
    .then(async (res) => {
      interaction.editReply({ content: `${res.data.text} \n> *[Original message](<${interaction.targetMessage.url}>)*` });
    });
  logger.log(`/${data.name} command done`);
}

export default data;