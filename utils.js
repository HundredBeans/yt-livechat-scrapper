const { db } = require("./db");

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

module.exports = {
  getAllChannels,
  getChannelCollectionById
}