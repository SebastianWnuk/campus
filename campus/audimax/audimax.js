


// bootstrapExtra = require('@workadventure/scripting-api-extra');

// bootstrapExtra.initDoors(assetsUrl);
// bootstrapExtra.initDoors();


WA.room.onEnterZone("A", () => {
    console.log("Hier beginnt Zone A");
    
});


console.log("Hallo");
WA.sendChatMessage('Hallo und Herzlich Willkommen auf unserem Campus :)  ', 'Easter-Eggs-Entwickler');

WA.onInit().then(() => {
    console.log('Player name: ', WA.player.name);
})

//WA.player.onPlayerMove(callback: HasPlayerMovedEventCallback): void;

WA.player.onPlayerMove(console.log);


WA.onEnterZone('myZone', () => {
    
    WA.openPopup('popupRectangle', 'This is an imporant message!', [{
        label: "Got it!",
        className: "primary",
        callback: (popup) => {
            
            popup.close();
        }
    }]);
});


//let currentPopup = undefined;



WA.room.onEnterZone('clock', () => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    //currentPopup = WA.ui.openPopup("clockPopup","It's " + time, []);
    WA.ui.openPopup("clockPopup","It's " + time, [{
        label: "Close",
        className: "normal",
        callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close();
        }
    }]);
});


//WA.room.onLeaveZone('clock', closePopUp);



// function closePopUp(){
//     if (currentPopup !== undefined) {
//         currentPopup.close();
//         currentPopup = undefined;
//     }
// }


WA.onEnterZone('HanSolozone', () => {
WA.openPopup('HanSolo', 'Han Solo ist eine fiktive Figur aus der Star Wars- Reihe von George Lucas . Han Solo ist ein rücksichtsloser Schmuggler mit einem sarkastischen Witz und wird von  Harrison Ford gespielt.', [{
    label: "Got it!",
    className: "primary",
    callback: (popup) => {
        
        popup.close();
    }
}]);
});





