import {
    ApplicationCommandOptionType,
    Client,
    GatewayIntentBits,
    RESTPostAPIApplicationCommandsJSONBody
} from "discord.js"
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
        name: "ping", // name of the command
        description: "pong" // description of the command
    },
    {
        name: "color",
        description: "Pick a color",
        options: [
            {
                name: "color",
                description: "color name",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: "red",
                        value: "red"
                    },
                    {
                        name: "blue",
                        value: "blue"
                    },
                    {
                        name: "green",
                        value: "green"
                    }
                ]
            }
        ]
    }
]

client.on("ready", (client) => {
    client.application.commands.set(commands)
})

client.on("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === "ping") {
            interaction.reply("Pong")
        }

        if (interaction.commandName === "color") {
            const choice = interaction.options.getString("color", true)

            interaction.reply({ content: `You choose ${choice}` })
        }
    }
})
