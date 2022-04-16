const { LiveChat } = require("youtube-chat");
const { getChannelCollectionById, getChannelData, sendNotification } = require("./utils");

/**
 * Function to initiate liveChat instance via channelId
 * @param {string} channelId 
 */
const initiateLiveChatInstance = async (channelId) => {
  const liveChat = new LiveChat({ channelId });

  const channelCollection = getChannelCollectionById(channelId);
  const { channelName, channelLink } = await getChannelData(channelId);
  if (!channelName || !channelLink) {
    console.log("ChannelID not found")
    return false
  }

  liveChat.on("start", liveId => {
    console.log("live started with liveId:", liveId)
    const message = `**Livestream Started** in Channel: [${channelName}](${channelLink}). Livestream [here](https://www.youtube.com/watch?v=${liveId})`
    sendNotification(message)
  });

  liveChat.on("error", err => {
    console.log("live error", err)
    // Only send notificatin if livestream found
    if (liveChat.liveId && err.message) {
      const message = `**Livestream error** in Channel: [${channelName}](${channelLink}). Cause: *${err.message}*`
      sendNotification(message)
    }
    if (liveChat.liveId) {
      sendNotification(`Stopping liveChat because of error: ${err.message || err}`)
      liveChat.stop("Error occured");
    }
  });

  liveChat.on("end", reason => {
    console.log("live ended", reason)
    const message = `**Livestream just ended** in Channel: [${channelName}](${channelLink}) with liveId: ${liveChat.liveId}`
    sendNotification(message)
  });

  liveChat.on("chat", chatItem => {
    const liveChatId = liveChat.liveId;
    if (liveChatId) {
      channelCollection.collection(liveChatId).doc().create(chatItem);
    }
  });

  const result = await liveChat.start()

  return result
}

module.exports = {
  initiateLiveChatInstance
}