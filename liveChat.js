const { LiveChat } = require("youtube-chat");
const { getChannelCollectionById } = require("./utils");

/**
 * Function to initiate liveChat instance via channelId
 * @param {string} channelId 
 */
const initiateLiveChatInstance = async (channelId) => {
  const liveChat = new LiveChat({ channelId });

  const channelCollection = getChannelCollectionById(channelId);

  liveChat.on("start", liveId => {
    console.log("live started with liveId:", liveId)
  });

  liveChat.on("error", err => {
    console.log("live error", err)
  });

  liveChat.on("end", reason => {
    console.log("live ended", reason)
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