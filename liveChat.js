const { LiveChat } = require("youtube-chat");
const { getChannelCollectionById, sendNotification } = require("./utils");

/**
 * Function to initiate liveChat instance via channelId
 * @param {string} channelId 
 */
const initiateLiveChatInstance = async (channelId, channelName, channelLink) => {
  const liveChat = new LiveChat({ channelId });

  const channelCollection = getChannelCollectionById(channelId);

  liveChat.on("start", liveId => {
    console.log("live started with liveId:", liveId)
    const message = `**Livestream Started** in Channel: [${channelName}](${channelLink}). Livestream [here](https://www.youtube.com/watch?v=${liveId})`
    sendNotification(message)
  });

  liveChat.on("error", err => {
    console.log("live error", err)
    const message = `**Livestream error** in Channel: [${channelName}](${channelLink}). Cause: *${err.message}*`
    sendNotification(message)
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

  await liveChat.start()

  return liveChat
}

module.exports = {
  initiateLiveChatInstance
}