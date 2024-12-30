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
        color: 0x2d2af7, // Color of the embed
        fields: [
            {
                name: "Field 1",
                value: "Value 1",
                inline: true
            },
            {
                name: "Field 2",
                value: "Value 2",
                inline: true
            }
        ],
        timestamp: new Date().toISOString() // Timestamp of the embed
    }

    const embed2: APIEmbed = {
        title: "Embed 2",
        description: "This is another embed",
        color: 0x5865f2,
        fields: [
            {
                name: "Field 3",
                value: "Value 3",
                inline: false
            },
            {
                name: "Field 4",
                value: "Value 4",
                inline: false
            }
        ],
        timestamp: new Date().toISOString()
    }

    await interaction.reply({ embeds: [embed, embed2] })
})

