

const {fana} = require('../njabulo/fana');
const fs = require("fs");
const { exec } = require("child_process");


const filename = `${Math.random().toString(36)}`;

  fana(
    {
      nomCom: 'volume',
      categorie: 'Audio-Edit',
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, msgRepondu } = commandeOptions;
  
      if (msgRepondu) {
        if (msgRepondu.voiceMessage) {
          const media5 = await zk.downloadAndSaveMediaMessage(msgRepondu.voiceMessage);
          let set5 = '-filter:a "atempo=0.8,asetrate=44100"';
          let ran5 = `${filename}.mp3`;
  
          try {
            exec(`ffmpeg -i ${media5} ${set5} ${ran5}`, (err, stderr, stdout) => {
              fs.unlinkSync(media5);
              if (err) return repondre("error during the procedure" + err);
  
              let buff5 = fs.readFileSync(ran5);
  
              zk.sendMessage(dest, { audio: buff5, mimetype: "voice/mpeg" }, { quoted: ms });
              fs.unlinkSync(ran5);
            });
          } catch (e) {
            repondre("Error : " + e);
          }
        } else {
          repondre("The command only works with audio messages");
        }
      } else {
        repondre("Please mention an audio");
      }
    }
  );

