import { Collection, codeBlock, InteractionType } from 'discord.js';
import { readdirSync } from 'node:fs';
import discord_client from './client.js';
import 'dotenv/config';

// Dynamically loading commands
async function init_Discord() {
  const commandset = new Collection();
  const cmdPath = `${process.cwd()}/Discord/commands/`;
  const cmdFiles = readdirSync(cmdPath).filter(file => file.endsWith('.js'));
  (async () => {
    try {
      for (const file of cmdFiles) {
        const { data, handler } = await import(`${cmdPath + file}`);
        commandset.set(data.name, handler);
      }
      console.log('Discord: Loaded all commands.');
    }
    catch (error) {
      console.error(error.message);
      console.log('Discord: Commands failed to load.');
      process.exit();
    }
  })();

  // Event Handlers
  discord_client.on('interactionCreate', async (interaction) => {
    if (interaction.type == InteractionType.ApplicationCommand) {
      const handler = commandset.get(interaction.commandName);
      try {
        await handler(interaction);
      }
      catch (error) {
        console.error(error.message);
        if (interaction.deferred) {
          await interaction.editReply({ content: `Bot ran into a problem :pensive: ${codeBlock(error.message)}` });
        }
        else {
          await interaction.reply({ content: `Bot ran into a problem :pensive: ${codeBlock(error.message)}` });
        }
      }
    }
    else {
      return;
    }
  });

  discord_client.on('ready', () => {
    console.log(`Discord: Logged in as ${discord_client.user.tag}`);
  });

  discord_client.login(process.env.TOKEN);
}

export default init_Discord;
