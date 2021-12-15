/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Calling bootstrapExtra will initiliaze all the "custom properties"  
bootstrapExtra();

console.log('Hello world!');



// //Player movement
// WA.player.onPlayerMove(console.log);

// //Clock
// console.log("Bootstrap");
// let currentPopup: any = undefined;

// WA.room.onEnterZone('clock', () => {
    
//     const today = new Date();
//     const time = today.getHours() + ":" + today.getMinutes();
//     currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
// })







//Chat Message

WA.sendChatMessage('Hallo und Herzlich Willkommen auf unserem Campus :)  ', 'Easter-Eggs-Entwickler');


//PlayerName in console
WA.onInit().then(() => {
    console.log('Player name: ', WA.player.name);
})





        





