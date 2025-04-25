
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");
fana({
  nomCom: "fact",
  reaction: '✌️',
  categorie: "Fun"
}, async (dest, zk, context) => {
  const { repondre: respond, arg, ms } = context;

  try {
    const response = await axios.get("https://nekos.life/api/v2/fact");
    const data = response.data;
    const factMessage = `
┏━━━━ *Njabulo-FACT* ━━━◆                     
┃
┃   *◇* ${data.fact} 
┃
┃   *◇* Regards Njabulo Jb
┃      
 ╭────────────────◆
 │ *_Powered by Njabulo Jb_*
 ╰────────────────◆
    `;

    await zk.sendMessage(dest, {
      text: factMessage,
      contextInfo: {
        externalAdReply: {
          title: "Fun Fact",
          body: "Here's a fun fact to enlighten your day!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the fact.");
  }
});

fana({
  nomCom: "quotes",
  reaction: '🚨',
  categorie: "Fun"
}, async (dest, zk, context) => {
  const { repondre: respond, arg, ms } = context;

  try {
    const response = await axios.get("https://favqs.com/api/qotd");
    const data = response.data;
    const quoteMessage = `
┏━━━━━NJABULO-QUOTE━━━◆
┃   *◇* _${data.quote.body}_
┃  
┃   *◇* *AUTHOR:* ${data.quote.author}
┃      
┃    *◇*  *regards Njabulo*
┃    
╭────────────────◆
│ *_Powered by Njabulo Jb*
╰────────────────◆
    `;

    await zk.sendMessage(dest, {
      text: quoteMessage,
      contextInfo: {
        externalAdReply: {
          title: "Daily Quote",
          body: "Here's an inspiring quote to motivate you!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the quote.");
  }
});

keith({
  nomCom: "hack",
  aliases: ["malware", "trojan"],
  reaction: "🪅",
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {
  try {
    const { ms } = commandeOptions;
    const mek = ms; // The message object for quoting

    // Define the steps of the prank
    const steps = [
      "```Injecting Malware```",
      "``` █ 10%```",
      "```█ █ 20%```",
      "```█ █ █ 30%```",
      "``` █ █ █ █ 40%```",
      "``` █ █ █ █ █ 50%```",
      "``` █ █ █ █ █ █ 60%```",
      "``` █ █ █ █ █ █ █ 70%```",
      "```█ █ █ █ █ █ █ █ 80%```",
      "```█ █ █ █ █ █ █ █ █ 90%```",
      "```█ █ █ █ █ █ █ █ █ █ 100%```",
      "```System hijacking on process..```",
      "```Connecting to Server error to find 404```",
      "```Device successfully connected...\nReceiving data...```",
      "```Data hijacked from device 100% completed\nKilling all evidence, killing all malwares...```",
      "```HACKING COMPLETED```",
      "```SENDING LOG DOCUMENTS...```",
      "```SUCCESSFULLY SENT DATA AND Connection disconnected```",
      "```BACKLOGS CLEARED```",
      "```POWERED BY NJABULO```",
      "```paralyzed by the mighty ${conf.OWNER_NAME}```"
    ];

    // Loop through all the steps and send them
    for (const line of steps) {
      await zk.sendMessage(dest, { text: line }, { quoted: mek });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for effect
    }

  } catch (error) {
    console.error('Error during prank:', error);
    // Send a more detailed error message
    await zk.sendMessage(dest, {
      text: `❌ *Error!* Something went wrong. Reason: ${error.message}. Please try again later.`
    });
  }
});
