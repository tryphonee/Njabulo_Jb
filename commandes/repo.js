"use strict";
const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ 
  nomCom: "repo", 
  categorie: "General",
  reaction: "🚘",
  aliases: ["source", "script"],
  desc: "Show bot repository information",
  nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
  const { repondre, prefixe } = commandeOptions;
  const githubRepo = 'https://api.github.com/repos/NjabuloJ/VW-GOLF';
  const thumbnailImg = 'https://files.catbox.moe/vm9usm.jpeg';
  const channelThumbnail = 'https://files.catbox.moe/4nt2ds.jpeg';

  try {
    // Fetch repository data
    const response = await axios.get(githubRepo, { timeout: 10000 });
    const data = response.data;

    if (!data) {
      return repondre("Could not fetch data");
    }

    const repoInfo = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdate: new Date(data.updated_at).toLocaleDateString('en-GB'),
      owner: data.owner.login,
    };

    const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');

    // Enhanced cage design with channel information
    const gitdata = `
*╭────────────━⊷*
*┋* *ɴᴀᴍᴇ:   ɴᴊᴀʙᴜʟᴏ ᴊʙ*
*┋* *sᴛᴀʀs:*  ${data.stargazers_count}
*┋* *ғᴏʀᴋs:*  ${data.forks_count}
*┋* *ᴡᴀᴛᴄʜᴇʀs:*  ${data.watchers}
*┋* *ᴜᴘᴅᴀᴛᴇᴅ:*  ${updated}
*┋* *ᴜʀʟ:* github.com/NjabuloJ/Njabulo-Jb
 *╰────────────━⊷*
`;

    await zk.sendMessage(dest, { 
      image: { url: thumbnailImg }, 
      caption: gitdata,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363345407274799@newsletter',
          newsletterName: "vw golf",
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "vw golf",
          body: "repo general bot",
          thumbnailUrl: channelThumbnail,
          sourceUrl: 'https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
       });

        // Send audio with caption
        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://files.catbox.moe/raje26.mp3" // Replace with your audio URL
            }, 
            mimetype: 'audio/mp4', 
            ptt: true, // Set to true if you want it as a voice note
            caption: "NJABULO-JB SONG",
            contextInfo: {
             isForwarded: true,
               forwardedNewsletterMessageInfo: {
             newsletterJid: "120363345407274799@newsletter",
              newsletterName: "vw golf",
               serverMessageId: -1
               },
                forwardingScore: 999,
                externalAdReply: {
               body: "vw golf",
               thumbnailUrl: "https://files.catbox.moe/mmm8ns.jpg",
               sourceUrl: 'https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z',
               rendersmallThumbnail: false
                }
            }
        });

    } catch (e) {
        console.log("Error fetching data:", error);
        repondre("❌ Error fetching repository data. Please try again later.");
    }
});
