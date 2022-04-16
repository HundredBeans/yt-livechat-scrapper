# Youtube Livechat Scrapper
Scraping youtube livechat and save it to firestore database also integrated with telegram for the notification. Personally use to scrape youtube livechat from Dota 2 Indonesia Broadcasters such as anonim and WXC Indonesia. Later those datas can be used to determine average viewers behavior in livechat using sentimental analysis. I built this out of curiosity to see how many toxic viewers compared to normal/supportive viewers. Cause why not?


# How to Use (Personal Notes)
1. Create firestore database within firebase and copy the service account keys to this directory (don't forget to add it to gitignore also)
2. Create the channel data in the firestore. (channelName and channelLink)
3. `yarn start` or `npm run start` with channelId as an argument. e.g `yarn start --channelId=UC-lHJZR3Gqxm24_Vd_AJ5Yw`
4. I personally run it using pm2 with command like `pm2 start "yarn start --channelId=desiredChannelId" --name=desired-task-name --restart-delay=300000`. That command will run the youtube livechat scrapper for channel with your desired channelId and if the livestream is not found or scrapping stopped, it will retry every 5 minutes