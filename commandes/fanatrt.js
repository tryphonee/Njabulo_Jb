const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const { downloadMediaMessage,downloadContentFromMessage } =  require('@whiskeysockets/baileys');
const fs =require("fs-extra") ;
const axios = require('axios');  
const FormData = require('form-data');
const { exec } = require("child_process");

fana({ nomCom: "trt", categorie: "Mods", reaction: "💗" }, async (dest, zk, commandeOptions) => {

  const { msgRepondu, repondre , arg } = commandeOptions;

  
   if(msgRepondu) {
     try {
      
     

       if(!arg || !arg[0]) { repondre('(eg : trt en)') ; return }
   

         let texttraduit = await traduire(msgRepondu.conversation , {to : arg[0]}) ;

         repondre(texttraduit)

        } catch (error) {
          
          repondre('Mention a texte Message') ;
      
        }

   } else {
     
     repondre('Mention a texte Message')
   }



}) ;
