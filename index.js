require('dotenv').config()

const { initiateLiveChatInstance } = require("./liveChat")
const { parseChannelId } = require("./utils")

const [channelIdArgs] = process.argv.slice(2)
const channelId = parseChannelId(channelIdArgs)

const startApp = async () => {
  console.log("Starting liveChat tracker")
  const result = await initiateLiveChatInstance(channelId);
  if (!result) {
    console.log("Fail to start")
  }
}

startApp()