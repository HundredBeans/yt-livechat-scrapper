require('dotenv').config()

const { initiateLiveChatInstance } = require("./liveChat")
const { getAllChannels } = require("./utils")


const startApp = async () => {
  const allChannels = await getAllChannels();
  console.log("Starting liveChat tracker...")
  await Promise.all(allChannels.map(async (channel) => {
    console.log(`Tracking for channel: ${channel.name} is started...`)
    await initiateLiveChatInstance(channel.id, channel.name, channel.link)
  }))
}

startApp()