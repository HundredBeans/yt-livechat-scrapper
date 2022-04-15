const { db } = require("./db");
const https = require("https");

const getChannelCollectionById = (id) => db.collection('channels').doc(id)

const getChannelData = async (id) => {
  const channelCollection = getChannelCollectionById(id);
  const channelCollectionRefs = await channelCollection.get();
  const data = channelCollectionRefs.data();
  return data
}

const sendNotification = (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=markdown`;
  https.get(url).on("error", (e) => {
    console.log("Send Telegram Message error", e)
  });
}

const parseChannelId = (args) => {
  const channelId = args.split("channelId=")[1]
  return channelId
}

module.exports = {
  getChannelCollectionById,
  getChannelData,
  sendNotification,
  parseChannelId
}