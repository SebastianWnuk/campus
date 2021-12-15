"use strict";
/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
exports.__esModule = true;
var scripting_api_extra_1 = require("@workadventure/scripting-api-extra");
// Calling bootstrapExtra will initiliaze all the "custom properties"  
(0, scripting_api_extra_1.bootstrapExtra)();
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
WA.onInit().then(function () {
    console.log('Player name: ', WA.player.name);
});
