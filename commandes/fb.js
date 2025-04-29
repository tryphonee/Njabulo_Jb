const {fana} = require('../njabulo/fana');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');


// Common contextInfo configuration
const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
  mentionedJid: [userJid],
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363249464136503@newsletter",
    newsletterName: "╭╼••➤®Njabulo Jb",
    serverMessageId: Math.floor(100000 + Math.random() * 900000),
  },
  externalAdReply: {
    showAdAttribution: true,
    title: conf.BOT || 'facebook Downloader',
    body: title || "Media Downloader",
    thumbnailUrl: thumbnailUrl || conf.URL || '',
    sourceUrl: conf.GURL || '',
    mediaType: 1,
    renderLargerThumbnail: false
  }
});

// video download command
fana({
  nomCom: "fb1",
  categorie: "Download",
  reaction: "🎬"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       const messagePayloads = [
      {
      image : { url : result.thumbnail},
      caption : caption},{quoted : ms}) ;
       const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
        },
      {
      video: { url: result.hd  }, 
      caption: 'facebook video downloader powered by *☆ɴᴊᴀʙᴜʟᴏ-ᴊʙ☆*' }, { quoted: ms });
    const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
     }
    ];

     for (const payload of messagePayloads) {
           await zk.sendMessage('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre(zk, dest, ms, `Download failed: ${error.message}`);
  }
});

// video download command
fana({
  nomCom: "fb3",
  categorie: "Download",
  reaction: "🎞️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link! !');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       const messagePayloads = [
      {
     image : { url : result.thumbnail}, 
    caption : caption},{quoted : ms}) ;
    const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
      },
      {
     video: { url: result.sd  }, 
     caption: 'facebook video downloader powered by *☆ɴᴊᴀʙᴜʟᴏ-ᴊʙ☆*' }, { quoted: ms });
     const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
      }
    ];

    for (const payload of messagePayloads) {
   repondre(zk, dest, ms, `Download failed: ${error.message}`);
    }


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('zk, dest, ms, `Download failed: ${error.message}`);
  }
});
      
