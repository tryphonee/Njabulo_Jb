const { fana } = require("../njabulo/fana");
const speed = require("performance-now");

// Function for delay simulation
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to safely get the sender's name
function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

// Command: Ping
fana(
  {
    nomCom: 'pi',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    const img = 'https://files.catbox.moe/vnlk9b.jpg';
    const murl = 'https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24';

    // Generate 3 ping results with random numbers
    const pingResults = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10000 + 1000));
    const formattedResults = pingResults.map(ping => `ѕρєє∂: ${ping}`);

    // Constructing the contact message
    const con = {
      key: {
        fromMe: false,
        participant: `${dest.sender ? dest.sender.split('@')[0] : "unknown"}@s.whatsapp.net`,
        ...(dest.chat ? { remoteJid: dest.chat } : {}),
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nitem1.TEL;waid=${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }:${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        },
      },
    };

    // Reply with ping results
    await zk.sendMessage(dest, {
      text: `*ηנαвυℓσ נв:* ${formattedResults}`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
        },
        forwardingScore: 999, // Score to indicate it has been forwarded
         externalAdReply: {
         title: "ηנαвυℓσ נв ѕρєє∂",
         body: "нαρριηєѕѕ вσт σηℓιηє",
         thumbnailUrl: img,
         mediaType: 1,
         renderSmallThumbnail: true // Small thumbnail rendering
        },
      },
      quoted: con,
    });

    console.log("Ping results sent successfully with verified tick!");
  }
);

// Command: Uptime
fana(
  {
    nomCom: 'up',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '💝',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    const runtime = process.uptime();
    const formattedRuntime = new Date(runtime * 1000).toISOString().substr(11, 8);
    const img = 'https://files.catbox.moe/vnlk9b.jpg';
    const murl = 'https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24';

    // Constructing the contact message
    const con = {
      key: {
        fromMe: false,
        participant: `${dest.sender ? dest.sender.split('@')[0] : "unknown"}@s.whatsapp.net`,
        ...(dest.chat ? { remoteJid: dest.chat } : {}),
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nitem1.TEL;waid=${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }:${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        },
      },
    };

    // Reply with uptime
    await zk.sendMessage(dest, {
      text: `*ηנαвυℓσ נв υρтιмє* 🕒\n\nRuntime: ${formattedRuntime}`,
      contextInfo: {
      isForwarded: true,
        forwardedNewsletterMessageInfo: {
        newsletterJid: '120363345407274799@newsletter',
        newsletterName: "╭••➤®Njabulo Jb",
          serverMessageId: 143,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
        externalAdReply: {
          title: "нαρριηєѕѕ вσт σηℓιηє",
          body: `вσт нαѕ вєєη яυηηιηg ƒσя: ${formattedRuntime}`,
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
      quoted: con,
    });

    console.log("Uptime sent successfully with verified tick!");
  }
);

module.exports = {
  delay,
};
    
