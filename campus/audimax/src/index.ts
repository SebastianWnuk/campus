/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Calling bootstrapExtra will initiliaze all the "custom properties"  
bootstrapExtra();

console.log('Hello world!');

console.log("Typescript neu ");

//Player movement
WA.player.onPlayerMove(console.log);

//Clock
console.log("Bootstrap");
let currentPopup: any = undefined;

WA.room.onEnterZone('clock', () => {
    
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})




WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


//Chat Message

WA.sendChatMessage('Hallo und Herzlich Willkommen auf unserem Campus :)  ', 'Easter-Eggs-Entwickler');


//PlayerName in console
WA.onInit().then(() => {
    console.log('Player name: ', WA.player.name);
})

//Han Solo zone
WA.onEnterZone('HanSolozone', () => {
    WA.openPopup('HanSolo', 'Han Solo ist eine fiktive Figur aus der Star Wars- Reihe von George Lucas . Han Solo ist ein rücksichtsloser Schmuggler mit einem sarkastischen Witz und wird von  Harrison Ford gespielt.', [{
        label: "Got it!",
        className: "primary",
        callback: (popup) => {
            
            popup.close();
        }
    }]);
    });


    //alien zone
    WA.onEnterZone('alienZone', () => {
        WA.openPopup('alien', 'Der Code Code zum Eintritt zu Capt. James T. Kirk lautet 12345', [{
            label: "Got it!",
            className: "primary",
            callback: (popup) => {
                
                popup.close();
            }
        }]);
        });


        console.log("nachalienzone");

        