
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");


fana({
  nomCom: "porn",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  const videoLink = arg.join(' ');

  if (!arg[0]) {
    return repondre('Please insert a video link.');
  }

  try {
    const response = await axios.get(`https://api.davidcyriltech.my.id/xvideo?url=${encodeURIComponent(videoLink)}`);

    if (response.data.success) {
      const title = response.data.title;
      const thumbnail = response.data.thumbnail;
      const downloadUrl = response.data.download_url;

      await zk.sendMessage(dest, {
        video: { url: downloadUrl },
        caption: title,
        contextInfo: {
          externalAdReply: {
            title: "Video Downloader",
            body: title,
            thumbnailUrl: thumbnail,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true, // Verified badge
          },
        },
      }, { quoted: ms });

    } else {
      repondre('Failed to retrieve video from the provided link.');
    }

  } catch (e) {
    repondre(`An error occurred during download: ${e.message}`);
  }
});

  
