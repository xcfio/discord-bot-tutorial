import { Client, GatewayIntentBits, RESTPostAPIApplicationCommandsJSONBody } from "discord.js"
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

// Command Object
const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = [
    {
        name: "ping", // Name of the command
        description: "Reply with pong" // Description of the command
    }
]

// Registering commands
client.on("ready", async (client) => {
    try {
        await client.application.commands.set(commands)
    } catch (error) {
        console.trace(error)
    }
})

// Handling command
client.on("interactionCreate", async (interaction) => {
    // Filter for chat input command
    if (!interaction.isChatInputCommand()) return

    // Handling ping command
    if (interaction.commandName === "ping") {
        // Reply to this interaction
        await interaction.reply({ content: "Pong!" })
    }
})
