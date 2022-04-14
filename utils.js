const { db } = require("./db");
const https = require("https");

const getAllChannels = async () => {
  const channels = []
  const channelRefs = await db.collection("channels").get();
  channelRefs.docs.forEach(doc => {
    const channelObj = {
      id: doc.id,
      name: doc.data().channelName,
      link: doc.data().channelLink
    }
    channels.push(channelObj)
  })
  return channels
}

const getChannelCollectionById = (id) => db.collection('channels').doc(id)

const sendNotification = (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=markdown`;
  https.get(url).on("error", (e) => {
    console.log("Send Telegram Message error", e)
  });
}

module.exports = {
  getAllChannels,
  getChannelCollectionById,
  sendNotification
}