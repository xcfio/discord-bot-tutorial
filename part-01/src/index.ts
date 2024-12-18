import { Client } from "discord.js"
import { token } from "../config.json"

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] })

client.on("ready", (client) => {
    console.log(`${client.user.tag} is online`)
})

client.on("messageCreate", (message) => {
    switch (message.content) {
        case "ping":
            message.reply("pong")
            break

        case "hello":
            message.reply("hi")
            break
    }
})

client.login(token)
