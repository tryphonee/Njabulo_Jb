const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

fana({
  nomCom: "surah",
 aliases: ["surahh", "qurann"],
  reaction: '🤲',
  categorie: "God-first"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const reference = arg.join(" ");
  
  if (!reference) {
    return repondre("Please specify the surah number or name.", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    });
  }
  
  try {
    const response = await axios.get(`https://quran-endpoint.vercel.app/quran/${reference}`);
    
    if (response.data.status !== 200) {
      return repondre("Invalid surah reference. Please specify a valid surah number or name.", {
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
          },
        },
      });
    }
    
    const data = response.data.data;
    const messageText = `
ᬑ *VW GOLF QURAN SURAH* ᬒ

*🕌 Quran: The Holy Book*
📜 *Surah:* 🕌❤️${data.number}: ${data.asma.ar.long} (${data.asma.en.long})❤️🕌
📝 *Type:* ${data.type.en}
🏮 *Number of verses:* ${data.ayahCount}
🔮 *Explanation (Urdu):* ${data.tafsir.id}
🔮 *Explanation (English):* ${data.tafsir.en}
`;
    
    await zk.sendMessage(dest, {
      text: messageText,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });
    
  } catch (error) {
    console.error("Error fetching Quran passage:", error);
    await repondre("API request failed. Please try again later.", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    });
  }
});
