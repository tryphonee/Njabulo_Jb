
const { fana } = require("../njabulo/fana")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
//const { uploadImageToImgur } = require('../njabulo/imgur');





fana({ nomCom: "tag", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿this command is reserved for groups ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; 
  tag +=`
  
 *Hallo* : *${nomAuteurMessage}* 
` ;




  let emoji = ['> ᴅᴇᴀʀ']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  zk.sendMessage(dest, {
        text: tag, 
        contextInfo: {
           isForwarded: true,
           forwardedNewsletterMessageInfo: {
           newsletterJid: '120363345407274799@newsletter',
             newsletterName: "╭••➤®Njabulo Jb",
              serverMessageId: 143,
                },
                forwardingScore: 999, // Score to indicate it has been forwarded
                 externalAdReply: {
                  title: `${nomGroupe},
                  body: "📃online is alwaysonline*,
                  thumbnailUrl: "https://files.catbox.moe/h4lxeb.jpg",
                  mediaType: 1,
                  renderSmallThumbnail: true // Small thumbnail rendering
                }
            }
        }, { quoted: ms });

   } else { repondre('command reserved for admins')}

});
