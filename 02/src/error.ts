require("./index")

process.on("uncaughtException", (error: Error, origin: string) => {
    if (error && error.message !== "Unknown interaction") {
        console.log(error, origin)
    }
})

process.on("unhandledRejection", (error: Error, origin: string) => {
    if (error && error.message !== "Unknown interaction") {
        console.log(error, origin)
    }
})
