
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

fana({
  nomCom: "pair",
  aliases: ["session", "code", "paircode", "qrcode"],
  reaction: '🧃,
  categorie: 'system'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    const replyText = "Example Usage: .code 2541111xxxxx.";
    return repondre(replyText);
  }

  try {
    // Notify user that pairing is in progress
    const replyText = "```wait is you generating your pairing code```";
    await repondre(replyText);

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://vw-session-ld.onrender.com/code?number=${encodedNumber}`;

    // Fetch the pairing code from the API
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.code) {
      const pairingCode = data.code;
      await zk.sendMessage(dest, {
        text: pairingCode,
        contextInfo: {
         isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363345407274799@newsletter',
            newsletterName: "_many_",
            serverMessageId: -1,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "put on you linked device",
            body: "session",
            thumbnailUrl: 'https://files.catbox.moe/ipy7l3.jpg', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true
          },
        },
      }, { quoted: ms });

      const secondReplyText = "Here is your pair code, copy and paste it to the notification above or link devices.";
      await repondre(secondReplyText);
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    const replyText = "Error getting response from API.";
    repondre(replyText);
  }
});
  
