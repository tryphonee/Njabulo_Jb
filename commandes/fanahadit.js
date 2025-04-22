const { fana } = require("../njabulo/fana");
const axios = require('axios'); // Ensure axios is imported
const conf = require(__dirname + "/../set");

fana({
  nomCom: "hadith",
  aliases: ["islam", "hadees"],
  reaction: '📖',
  categorie: "Books"
}, async (dest, zk, params) => {
  const { repondre } = params;

  try {
    const response = await axios.get("https://bk9.fun/Islam/hadith", {
      timeout: 10000 // 10 seconds timeout
    });

    if (response.status === 200 && response.data) {
      const hadithText = response.data.hadith || response.data; // Adjust based on API response format

      await zk.sendMessage(dest, {
        text: `📜 *Hadith of the Day:*\n\n"${hadithText}"`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
          },
        },
      });
    } else {
      throw new Error("Invalid response from Hadith API");
    }
  } catch (error) {
    console.error("Error fetching Hadith:", error.message);
    await repondre("Sorry, I couldn't fetch a Hadith at the moment.");
  }
});
          
