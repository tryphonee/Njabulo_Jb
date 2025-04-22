
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");
const { dare, truth, random_question, amount_of_questions } = require('../bdd/truth-dare.js');
fana({
  nomCom: "advice",
  aliases: ["wisdom", "wise"],
  reaction: "🗨️",
  categorie: "Fun"
}, async (dest, zk, context) => {
  const { reply: replyToUser, ms: messageQuote } = context;
  try {
    // Get advice from the API using axios
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = response.data.slip.advice;

    // Send the advice with ad reply
    await zk.sendMessage(dest, {
      text: `Here is your advice: ${advice} 😊`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
        externalAdReply: {
          title: "advice",
          body: "Here’s a little nugget of wisdom to brighten your day!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });
  } catch (error) {
    console.error("Error fetching advice:", error.message || "An error occurred");
    await replyToUser("Oops, an error occurred while processing your request.");
  }
});

fana({
  nomCom: "trivia",
  reaction: '🤔',
  categorie: 'Fun'
}, async (dest, zk, context) => {
  const { reply: replyToUser, prefix: prefix, ms: messageQuote } = context;
  try {
    // Fetch trivia question using axios
    const response = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
    if (response.status !== 200) {
      return replyToUser("Invalid response from the trivia API. Status code: " + response.status);
    }

    const trivia = response.data.results[0];
    const question = trivia.question;
    const correctAnswer = trivia.correct_answer;
    const answers = [...trivia.incorrect_answers, correctAnswer].sort();

    // Format answer choices
    const answerChoices = answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n");

    // Send trivia question with answer choices
    await zk.sendMessage(dest, {
      text: `Here's a trivia question for you: \n\n${question}\n\n${answerChoices}\n\nI will send the correct answer in 10 seconds...`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
        externalAdReply: {
          title: "trivia",
          body: "Challenge yourself with this fun trivia question!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });

    // Send the correct answer after 10 seconds
    setTimeout(async () => {
      await zk.sendMessage(dest, {
        text: `The correct answer is: ${correctAnswer}`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "trivia",
         serverMessageId: 143,
          externalAdReply: {
            title: "Trivia Answer Revealed",
            body: "Did you get it right? Try another trivia question!",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      }, { quoted: messageQuote });
    }, 10000); // Delay for 10 seconds

  } catch (error) {
    console.error("Error getting trivia:", error.message);
    await zk.sendMessage(dest, {
      text: "Error getting trivia. Please try again later.",
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "trivia",
         serverMessageId: 143,
        externalAdReply: {
          title: "Trivia Error",
          body: "There was an error retrieving the trivia question. Please try again.",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });
  }
});


fana({
  nomCom: "question",
  categorie: "Fun",
  reaction: "👄"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    // Respond with a random question
    await zk.sendMessage(dest, {
      text: random_question(),
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "question",
         serverMessageId: 143,
        externalAdReply: {
          title: "Random Question",
          body: "Here's a fun random question for you to ponder!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error while handling 'question' command:", error);
    await repondre("Sorry, something went wrong.");
  }
});

// Command for truth
fana({
  nomCom: "truth",
  categorie: "Fun",
  reaction: "👄"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    // Respond with a truth question
    await zk.sendMessage(dest, {
      text: truth(),
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
        externalAdReply: {
          title: "truth",
          body: "Here's a truth question to test your honesty!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error while handling 'truth' command:", error);
    await repondre("Sorry, something went wrong.");
  }
});

// Command for dare
fana({
  nomCom: "dare",
  categorie: "Fun",
  reaction: "👄"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    // Respond with a dare
    await zk.sendMessage(dest, {
      text: dare(),
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
        externalAdReply: {
          title: "Dare Challenge",
          body: "Here's a dare to challenge your bravery!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error while handling 'dare' command:", error);
    await repondre("Sorry, something went wrong.");
  }
});

// Command for amount of questions
fana({
  nomCom: "amountquiz",
  categorie: "Fun",
  reaction: "👄"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    // Call amount_of_questions with the desired type, defaulting to 0 (all questions)
    const totalQuestions = amount_of_questions(0);  // Change 0 to 1 or 2 depending on the desired category
    await zk.sendMessage(dest, {
      text: `${totalQuestions}`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
        externalAdReply: {
          title: "amountquiz",
          body: "Here's the total number of questions available!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error while handling 'amountquiz' command:", error);
    await repondre("Sorry, something went wrong.");
  }
});

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
┏━━NJABULO-FACT━━━━◆                     
┃
┃   *◇* ${data.fact} 
┃
┃   *◇* Regards Njabulo Jb
┃      
 ╭────────────────◆
 │ *Powered by Njabulo Jb*
 ╰────────────────◆
    `;

    await zk.sendMessage(dest, {
      text: factMessage,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
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
  reaction: '🧃',
  categorie: "Fun"
}, async (dest, zk, context) => {
  const { repondre: respond, arg, ms } = context;

  try {
    const response = await axios.get("https://favqs.com/api/qotd");
    const data = response.data;
    const quoteMessage = `
┏━━NJABULO JB-QUOTE━━◆
┃   *◇* _${data.quote.body}_
┃  
┃   *◇* *AUTHOR:* ${data.quote.author}
┃      
┃    *◇*  *regards Njabulo Jb*
┃    
╭────────────────◆
│ *_Powered by Njabulo Jb*
╰─────────────────◆
    `;

    await zk.sendMessage(dest, {
      text: quoteMessage,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "_many_",
         serverMessageId: 143,
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

fana({
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
      "```POWERED BY NJABULO JB```",
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


fana({
  nomCom: "happy",
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations =  ['😃', '😄', '😁', '😊', '😎', '🥳', '😸', '😹', '🌞', '🌈', '😃', '😄', '😁', '😊', '😎', '🥳', '😸', '😹', '🌞', '🌈', '😃', '😄', '😁', '😊'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
fana({
  nomCom: "hrt",
  aliases: ["moyo", "heart"],
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations =  ['💖', '💗', '💕', '❤️', '💛', '💚', '🫀', '💙', '💜', '🖤', '♥️', '🤍', '🤎', '💗', '💞', '💓', '💘', '💝', '♥️', '💟', '🫀', '❤️'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
fana({
  nomCom: "angry",
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations =   ['😡', '😠', '🤬', '😤', '😾', '😡', '😠', '🤬', '😤', '😾'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
fana({
  nomCom: "sad",
  aliases: ["heartbroken", "hrtbroken"],
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations =  ['🥺', '😟', '😕', '😖', '😫', '🙁', '😩', '😥', '😓', '😪', '😢', '😔', '😞', '😭', '💔', '😭', '😿'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
fana({
  nomCom: "shy",
  aliases: ["shyoff", "shyy"],
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations =  ['😳', '😊', '😶', '🙈', '🙊', '😳', '😊', '😶', '🙈', '🙊'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
fana({
  nomCom: "moon",
  aliases: ["mon", "crescent"],
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations =   ['🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', "🌚🌝"];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});

fana({
  nomCom: "nikal",
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations = ["   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏          ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄   __        ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏          ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Lavde   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄  |__|     ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸   Pehli   ⡇\n ⣟⣿⡭     ⢱       ⣿  ⢹            ⡇\n  ⠙⢿⣯⠄  (P)       ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Fursat  ⡇\n ⣟⣿⡭     ⢱         ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄   __        ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Meeee   ⡇\n ⣟⣿⡭     ⢱         ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄  |__|      ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸           ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲   ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹            ⡇\n  ⠙⢿⣯⠄  lodu     ⡿  ⡇       ⡼\n   ⠹⣶⠆       ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸ "];

    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});

fana({
  nomCom: "hand",
  categorie: "Fun",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "✊🏻 *STARTED...* 💦" });
    const animations = [
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D', '8==✊️=D', '8=✊️==D', 
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D', '8==✊️=D', '8=✊️==D', 
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D', '8==✊️=D', '8=✊️==D', 
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D 💦', '8==✊️=D💦 💦', '8=✊️==D 💦💦 💦'
    ];

    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});




