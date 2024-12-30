import { APIEmbed, Client, GatewayIntentBits, RESTPostAPIApplicationCommandsJSONBody } from "discord.js"
import config from "../config.json"

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

client.login(config.token)
client.on("ready", (client) => console.log(`${client.user.tag} is online`))

const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = [
    {
        name: "embed",
        description: "Make the bot reply with an embed"
    }
]

client.on("ready", async (client) => {
    try {
        await client.application.commands.set(commands)
        console.log(`Successfully reloaded ${commands.length} application (/) commands.`)
    } catch (error) {
        console.trace(error)
    }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand() || interaction.commandName !== "embed") return

    const embed: APIEmbed = {
        title: "Embed", // Title of the embed
        description: "This is an embed", // Description of the embed
        color: 0x5865f2, // Color of the embed
        thumbnail: {
            url: "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        timestamp: new Date().toISOString() // Timestamp of the embed
    }

    await interaction.reply({ embeds: [embed] })
})

