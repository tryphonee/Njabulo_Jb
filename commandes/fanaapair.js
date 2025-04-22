
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

fana({
  nomCom: "pair",
  aliases: ["session", "code", "paircode", "qrcode"],
  reaction: '☘️',
  categorie: 'General'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    const replyText = "Example Usage: .code 2541111xxxxx.";
    return repondre(replyText);
  }

  try {
    // Notify user that pairing is in progress
    const replyText = "Njabulo Jb is generating your pairing code ✅...";
    await repondre(replyText);

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://pair-session.onrender.com/code?number=${encodedNumber}`;

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
         newsletterName: "_may_",
         serverMessageId: 143,
         },
       forwardingScore: 999, // Score to indicate it has been forwarded
            externalAdReply: {
             title: "here is you pair code",
              body: "Njabulo JB session",
              thumbnailUrl: 'https://files.catbox.moe/h4lxeb.jpg', // Add thumbnail URL if required
               mediaType: 1,
               renderSmallThumbnail: true // Small thumbnail rendering
                }
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
