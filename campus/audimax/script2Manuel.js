/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@workadventure/scripting-api-extra/dist/Features/configuration.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@workadventure/scripting-api-extra/dist/Features/configuration.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "initConfiguration": () => (/* binding */ initConfiguration)
    /* harmony export */ });
    /* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Properties */ "./node_modules/@workadventure/scripting-api-extra/dist/Properties.js");
    
    function initConfiguration(assetsUrl) {
        const map =  WA.room.getTiledMap();
        const configurationLayer = map.layers.find((layer) => layer.name === "configuration");
        if (configurationLayer) {
            const properties = new _Properties__WEBPACK_IMPORTED_MODULE_0__.Properties(configurationLayer.properties);
            const tag = properties.getString("tag");
            if (!tag || WA.player.tags.includes(tag)) {
                WA.ui.registerMenuCommand("Configure the room", () => {
                    var _a;
                    assetsUrl = (_a = assetsUrl !== null && assetsUrl !== void 0 ? assetsUrl : process.env.ASSETS_URL) !== null && _a !== void 0 ? _a : "";
                    WA.nav.openCoWebSite(assetsUrl + "configuration.html", true);
                });
            }
        }
    }
    //# sourceMappingURL=configuration.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/Features/doors.js":
    /*!********************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/Features/doors.js ***!
      \********************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "initDoors": () => (/* binding */ initDoors)
    /* harmony export */ });
    /* harmony import */ var _VariablesExtra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VariablesExtra */ "./node_modules/@workadventure/scripting-api-extra/dist/VariablesExtra.js");
    /* harmony import */ var _LayersFlattener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../LayersFlattener */ "./node_modules/@workadventure/scripting-api-extra/dist/LayersFlattener.js");
    /* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Properties */ "./node_modules/@workadventure/scripting-api-extra/dist/Properties.js");
    /* harmony import */ var _LayersExtra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LayersExtra */ "./node_modules/@workadventure/scripting-api-extra/dist/LayersExtra.js");
    
    WA.sendChatMessage('Hallo und Herzlich Willkommen auf unserem Campus :)  ', 'Easter-Eggs-Entwickler');
    
    

    WA.onInit().then(() => {
        console.log('Player name: ', WA.player.name);
    })


    // Clock
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


    const map = WA.room.getTiledMap();
    console.log(map);
    console.log("Map");
    const mapProperties = new Properties(map.properties);
    
    console.log("mapProperties" + mapProperties);

    WA.room.onEnterZone("doorOpenA", () => {
        console.log("Hier beginnt Zone A");
        initDoorstep("door_open_zone1","door", map[1]);
    });

    
    console.log("script");


    let layersMap;
    let playerX = 0;
    let playerY = 0;
    function updateDoorLayers(variable) {
        if (WA.state[variable.name]) {
            let layers = variable.properties.mustGetString("openLayer");
            for (const layer of layers.split("\n")) {
                WA.room.showLayer(layer);
            }
            layers = variable.properties.mustGetString("closeLayer");
            for (const layer of layers.split("\n")) {
                WA.room.hideLayer(layer);
            }
        }
        else {
            let layers = variable.properties.mustGetString("openLayer");
            for (const layer of layers.split("\n")) {
                WA.room.hideLayer(layer);
            }
            layers = variable.properties.mustGetString("closeLayer");
            for (const layer of layers.split("\n")) {
                WA.room.showLayer(layer);
            }
        }
    }
    function playOpenSound(variable) {
        const url = variable.properties.getString("openSound");
        const radius = variable.properties.getNumber("soundRadius");
        let volume = 1;
        if (radius) {
            const distance = getDistance(variable.properties.mustGetString("openLayer").split("\n"));
            if (distance > radius) {
                return;
            }
            volume = 1 - distance / radius;
        }
        if (url) {
            WA.sound.loadSound(url).play({
                volume,
            });
        }
    }
    function playCloseSound(variable) {
        const url = variable.properties.getString("closeSound");
        const radius = variable.properties.getNumber("soundRadius");
        let volume = 1;
        if (radius) {
            const distance = getDistance(variable.properties.mustGetString("closeLayer").split("\n"));
            if (distance > radius) {
                return;
            }
            volume = 1 - distance / radius;
        }
        if (url) {
            WA.sound.loadSound(url).play({
                volume,
            });
        }
    }
    function getTileLayers(layerNames) {
        return layerNames
            .map((layerName) => layersMap.get(layerName))
            .filter((layer) => (layer === null || layer === void 0 ? void 0 : layer.type) === "tilelayer");
    }
    function getDistance(layerNames) {
        const layers = getTileLayers(layerNames);
        const boundaries = (0,_LayersExtra__WEBPACK_IMPORTED_MODULE_3__.findLayersBoundaries)(layers);
        const xLayer = ((boundaries.right - boundaries.left) / 2 + boundaries.left) * 32;
        const yLayer = ((boundaries.bottom - boundaries.top) / 2 + boundaries.top) * 32;
        return Math.sqrt(Math.pow(playerX - xLayer, 2) + Math.pow(playerY - yLayer, 2));
    }
    function initDoor(variable) {
        WA.state.onVariableChange(variable.name).subscribe(() => {
            if (WA.state[variable.name]) {
                playOpenSound(variable);
            }
            else {
                playCloseSound(variable);
            }
            updateDoorLayers(variable);
        });
        updateDoorLayers(variable);
    }
    function initDoorstep(layer, doorVariable, properties, assetsUrl) {
        const name = layer.name;
        let actionMessage = undefined;
        let keypadWebsite = undefined;
        let inZone = false;
        const zoneName = properties.getString("zone");
        if (!zoneName) {
            throw new Error('Missing "zone" property on doorstep layer "' + name + '"');
        }
        const tag = properties.getString("tag");
        let allowed = true;
        if (tag && !WA.player.tags.includes(tag)) {
            allowed = false;
        }
        const accessRestricted = !!tag;
        function displayCloseDoorMessage() {
            var _a;
            if (actionMessage) {
                actionMessage.remove();
            }
            actionMessage = WA.ui.displayActionMessage({
                message: (_a = properties.getString("closeTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE to close the door",
                callback: () => {
                    WA.state[doorVariable.name] = false;
                    displayOpenDoorMessage();
                },
            });
        }
        function displayOpenDoorMessage() {
            var _a;
            if (actionMessage) {
                actionMessage.remove();
            }
            actionMessage = WA.ui.displayActionMessage({
                message: (_a = properties.getString("openTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE to open the door",
                callback: () => {
                    WA.state[doorVariable.name] = true;
                    displayCloseDoorMessage();
                },
            });
        }
        function openKeypad(name) {
            const boundaries = (0,_LayersExtra__WEBPACK_IMPORTED_MODULE_3__.findLayersBoundaries)(getTileLayers(doorVariable.properties.mustGetString("closeLayer").split("\n")));
            keypadWebsite = WA.room.website.create({
                name: "doorKeypad" + name,
                url: assetsUrl + "/keypad.html#" + encodeURIComponent(name),
                position: {
                    x: boundaries.right * 32,
                    y: boundaries.top * 32,
                    width: 32 * 3,
                    height: 32 * 4,
                },
                allowApi: true, 
            });
        }
        function closeKeypad() {
            if (keypadWebsite) {
                WA.room.website.delete(keypadWebsite.name);
                keypadWebsite = undefined;
            }
        }
        WA.room.onEnterZone(zoneName, () => {
            inZone = true;
            if (properties.getBoolean("autoOpen") && allowed) {
                WA.state[doorVariable.name] = true;
                return;
            }
            if (!WA.state[doorVariable.name] &&
                ((accessRestricted && !allowed) || !accessRestricted) &&
                (properties.getString("code") || properties.getString("codeVariable"))) {
                openKeypad(name);
                return;
            }
            if (!allowed) {
                return;
            }
            if (WA.state[doorVariable.name]) {
                displayCloseDoorMessage();
            }
            else {
                displayOpenDoorMessage();
            }
        });
        WA.room.onLeaveZone(zoneName, () => {
            inZone = false;
            if (properties.getBoolean("autoClose")) {
                WA.state[doorVariable.name] = false;
            }
            if (actionMessage) {
                actionMessage.remove();
            }
            closeKeypad();
        });
        WA.state.onVariableChange(doorVariable.name).subscribe(() => {
            if (inZone) {
                if (!properties.getBoolean("autoClose") && WA.state[doorVariable.name] === true) {
                    displayCloseDoorMessage();
                }
                if (keypadWebsite && WA.state[doorVariable.name] === true) {
                    closeKeypad();
                }
                if (!properties.getBoolean("autoOpen") && WA.state[doorVariable.name] === false) {
                    displayOpenDoorMessage();
                }
            }
        });
    }
    function playBellSound(variable) {
        const url = variable.properties.mustGetString("bellSound");
        const radius = variable.properties.getNumber("soundRadius");
        let volume = 1;
        if (radius) {
            const distance = Math.sqrt(Math.pow(variable.x - playerX, 2) + Math.pow(variable.y - playerY, 2));
            if (distance > radius) {
                return;
            }
            volume = 1 - distance / radius;
        }
        WA.sound.loadSound(url).play({
            volume,
        });
    }
    function initBell(variable) {
        if (WA.state[variable.name] === undefined) {
            WA.state[variable.name] = 0;
        }
        WA.state.onVariableChange(variable.name).subscribe(() => {
            if (WA.state[variable.name]) {
                playBellSound(variable);
            }
        });
    }
    function initBellLayer(bellVariable, properties) {
        let popup = undefined;
        const zoneName = properties.mustGetString("zone");
        const bellPopupName = properties.getString("bellPopup");
        WA.room.onEnterZone(zoneName, () => {
            var _a;
            if (!bellPopupName) {
                WA.state[bellVariable] = WA.state[bellVariable] + 1;
            }
            else {
                popup = WA.ui.openPopup(bellPopupName, "", [
                    {
                        label: (_a = properties.getString("bellButtonText")) !== null && _a !== void 0 ? _a : "Ring",
                        callback: () => {
                            WA.state[bellVariable] = WA.state[bellVariable] + 1;
                        },
                    },
                ]);
            }
        });
        WA.room.onLeaveZone(zoneName, () => {
            if (popup) {
                popup.close();
                popup = undefined;
            }
        });
    }
    function initDoors(assetsUrl) {
        var _a;
        assetsUrl = (_a = assetsUrl !== null && assetsUrl !== void 0 ? assetsUrl : process.env.ASSETS_URL) !== null && _a !== void 0 ? _a : "";
        const variables = (0,_VariablesExtra__WEBPACK_IMPORTED_MODULE_0__.getAllVariables)();
        layersMap = (0,_LayersFlattener__WEBPACK_IMPORTED_MODULE_1__.getLayersMap)();
        for (const variable of variables.values()) {
            if (variable.properties.get("door")) {
                initDoor(variable);
            }
            if (variable.properties.get("bell")) {
                initBell(variable);
            }
        }
        for (const layer of layersMap.values()) {
            const properties = new _Properties__WEBPACK_IMPORTED_MODULE_2__.Properties(layer.properties);
            const doorVariableName = properties.getString("doorVariable");
            if (doorVariableName && layer.type === "tilelayer") {
                const doorVariable = variables.get(doorVariableName);
                if (doorVariable === undefined) {
                    throw new Error('Cannot find variable "' +
                        doorVariableName +
                        '" referred in the "doorVariable" property of layer "' +
                        layer.name +
                        '"');
                }
                initDoorstep(layer, doorVariable, properties, assetsUrl);
            }
            const bellVariable = properties.getString("bellVariable");
            if (bellVariable) {
                initBellLayer(bellVariable, properties);
            }
        }
        WA.player.onPlayerMove((moveEvent) => {
            playerX = moveEvent.x;
            playerY = moveEvent.y;
        });
    }
    //# sourceMappingURL=doors.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/Features/properties_templates.js":
    /*!***********************************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/Features/properties_templates.js ***!
      \***********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "initPropertiesTemplates": () => (/* binding */ initPropertiesTemplates)
    /* harmony export */ });
    /* harmony import */ var _LayersFlattener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LayersFlattener */ "./node_modules/@workadventure/scripting-api-extra/dist/LayersFlattener.js");
    /* harmony import */ var _TemplateValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TemplateValue */ "./node_modules/@workadventure/scripting-api-extra/dist/TemplateValue.js");
    
    
    async function initPropertiesTemplates() {
        var _a;
        const layers = await (0,_LayersFlattener__WEBPACK_IMPORTED_MODULE_0__.getLayersMap)();
        for (const [layerName, layer] of layers.entries()) {
            const properties = (_a = layer.properties) !== null && _a !== void 0 ? _a : [];
            for (const property of properties) {
                if (property.type === "int" || property.type === "bool" || property.type === "object") {
                    continue;
                }
                const template = new _TemplateValue__WEBPACK_IMPORTED_MODULE_1__.TemplateValue(property.value, WA.state);
                if (template.isPureString()) {
                    continue;
                }
                const newValue = template.getValue();
                setProperty(layerName, property.name, newValue);
                template.onChange((newValue) => {
                    setProperty(layerName, property.name, newValue);
                });
            }
        }
    }
    function setProperty(layerName, propertyName, value) {
        WA.room.setProperty(layerName, propertyName, value);
        if (propertyName === "visible") {
            if (value) {
                WA.room.showLayer(layerName);
            }
            else {
                WA.room.hideLayer(layerName);
            }
        }
    }
    //# sourceMappingURL=properties_templates.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/Features/special_properties.js":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/Features/special_properties.js ***!
      \*********************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "initSpecialProperties": () => (/* binding */ initSpecialProperties)
    /* harmony export */ });
    /* harmony import */ var _LayersFlattener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LayersFlattener */ "./node_modules/@workadventure/scripting-api-extra/dist/LayersFlattener.js");
    /* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Properties */ "./node_modules/@workadventure/scripting-api-extra/dist/Properties.js");
    /* harmony import */ var _variable_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variable_actions */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/variable_actions.js");
    
    
    
    async function initSpecialProperties() {
        const layers = (0,_LayersFlattener__WEBPACK_IMPORTED_MODULE_0__.getLayersMap)();
        for (const layer of layers.values()) {
            const properties = new _Properties__WEBPACK_IMPORTED_MODULE_1__.Properties(layer.properties);
            (0,_variable_actions__WEBPACK_IMPORTED_MODULE_2__.initVariableActionLayer)(properties);
        }
    }
    //# sourceMappingURL=special_properties.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/Features/variable_actions.js":
    /*!*******************************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/Features/variable_actions.js ***!
      \*******************************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "initVariableActionLayer": () => (/* binding */ initVariableActionLayer)
    /* harmony export */ });
    function initVariableActionLayer(properties) {
        const variableName = properties.getString("bindVariable");
        if (variableName) {
            const zone = properties.getString("zone");
            if (!zone) {
                throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');
            }
            const enterValue = properties.get("enterValue");
            const leaveValue = properties.get("leaveValue");
            const triggerMessage = properties.getString("triggerMessage");
            const tag = properties.getString("tag");
            setupVariableActionLayer(variableName, zone, enterValue, leaveValue, triggerMessage, tag);
        }
    }
    function setupVariableActionLayer(variableName, zone, enterValue, leaveValue, triggerMessage, tag) {
        if (tag && !WA.player.tags.includes(tag)) {
            return;
        }
        if (enterValue !== undefined) {
            WA.room.onEnterZone(zone, () => {
                if (triggerMessage) {
                }
                else {
                    WA.state[variableName] = enterValue;
                }
            });
        }
        if (leaveValue !== undefined) {
            WA.room.onLeaveZone(zone, () => {
                WA.state[variableName] = leaveValue;
            });
        }
    }
    //# sourceMappingURL=variable_actions.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/LayersExtra.js":
    /*!*****************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/LayersExtra.js ***!
      \*****************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "findLayerBoundaries": () => (/* binding */ findLayerBoundaries),
    /* harmony export */   "findLayersBoundaries": () => (/* binding */ findLayersBoundaries)
    /* harmony export */ });
    function findLayerBoundaries(layer) {
        let left = Infinity;
        let top = Infinity;
        let bottom = 0;
        let right = 0;
        const data = layer.data;
        if (typeof data === "string") {
            throw new Error("Unsupported tile layer data stored as string instead of CSV");
        }
        for (let j = 0; j < layer.height; j++) {
            for (let i = 0; i < layer.width; i++) {
                if (data[i + j * layer.width] !== 0) {
                    left = Math.min(left, i);
                    right = Math.max(right, i);
                    top = Math.min(top, j);
                    bottom = Math.max(bottom, j);
                }
            }
        }
        return {
            top,
            left,
            right: right + 1,
            bottom: bottom + 1,
        };
    }
    function findLayersBoundaries(layers) {
        let left = Infinity;
        let top = Infinity;
        let bottom = 0;
        let right = 0;
        for (const layer of layers) {
            const boundaries = findLayerBoundaries(layer);
            if (boundaries.left < left) {
                left = boundaries.left;
            }
            if (boundaries.top < top) {
                top = boundaries.top;
            }
            if (boundaries.right > right) {
                right = boundaries.right;
            }
            if (boundaries.bottom > bottom) {
                bottom = boundaries.bottom;
            }
        }
        return {
            top,
            left,
            right,
            bottom,
        };
    }
    //# sourceMappingURL=LayersExtra.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/LayersFlattener.js":
    /*!*********************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/LayersFlattener.js ***!
      \*********************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "getLayersMap": () => (/* binding */ getLayersMap)
    /* harmony export */ });
    let layersMapPromise = undefined;
    async function getLayersMap() {
        if (layersMapPromise === undefined) {
            layersMapPromise = getLayersMapWithoutCache();
        }
        return layersMapPromise;
    }
    async function getLayersMapWithoutCache() {
        return flattenGroupLayersMap(WA.room.getTiledMap());
    }
    function flattenGroupLayersMap(map) {
        const flatLayers = new Map();
        flattenGroupLayers(map.layers, "", flatLayers);
        return flatLayers;
    }
    function flattenGroupLayers(layers, prefix, flatLayers) {
        for (const layer of layers) {
            if (layer.type === "group") {
                flattenGroupLayers(layer.layers, prefix + layer.name + "/", flatLayers);
            }
            else {
                layer.name = prefix + layer.name;
                flatLayers.set(layer.name, layer);
            }
        }
    }
    //# sourceMappingURL=LayersFlattener.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/Properties.js":
    /*!****************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/Properties.js ***!
      \****************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "Properties": () => (/* binding */ Properties)
    /* harmony export */ });
    class Properties {
        constructor(properties) {
            this.properties = properties !== null && properties !== void 0 ? properties : [];
        }
        get(name) {
            const values = this.properties
                .filter((property) => property.name === name)
                .map((property) => property.value);
            if (values.length > 1) {
                throw new Error('Expected only one property to be named "' + name + '"');
            }
            if (values.length === 0) {
                return undefined;
            }
            return values[0];
        }
        getString(name) {
            return this.getByType(name, "string");
        }
        getNumber(name) {
            return this.getByType(name, "number");
        }
        getBoolean(name) {
            return this.getByType(name, "boolean");
        }
        getByType(name, type) {
            const value = this.get(name);
            if (value === undefined) {
                return undefined;
            }
            if (typeof value !== type) {
                throw new Error('Expected property "' + name + '" to have type "' + type + '"');
            }
            return value;
        }
        mustGetString(name) {
            return this.mustGetByType(name, "string");
        }
        mustGetNumber(name) {
            return this.mustGetByType(name, "number");
        }
        mustGetBoolean(name) {
            return this.mustGetByType(name, "boolean");
        }
        mustGetByType(name, type) {
            const value = this.get(name);
            if (value === undefined) {
                throw new Error('Property "' + name + '" is missing');
            }
            if (typeof value !== type) {
                throw new Error('Expected property "' + name + '" to have type "' + type + '"');
            }
            return value;
        }
        getType(name) {
            const types = this.properties
                .filter((property) => property.name === name)
                .map((property) => property.type);
            if (types.length > 1) {
                throw new Error('Expected only one property to be named "' + name + '"');
            }
            if (types.length === 0) {
                return undefined;
            }
            return types[0];
        }
    }
    //# sourceMappingURL=Properties.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/TemplateValue.js":
    /*!*******************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/TemplateValue.js ***!
      \*******************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "TemplateValue": () => (/* binding */ TemplateValue)
    /* harmony export */ });
    /* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mustache */ "./node_modules/mustache/mustache.mjs");
    
    class TemplateValue {
        constructor(template, state) {
            this.template = template;
            this.state = state;
            this.ast = mustache__WEBPACK_IMPORTED_MODULE_0__.default.parse(template);
        }
        getValue() {
            if (this.value === undefined) {
                this.value = mustache__WEBPACK_IMPORTED_MODULE_0__.default.render(this.template, this.state);
            }
            return this.value;
        }
        onChange(callback) {
            const subscriptions = [];
            for (const variableName of this.getUsedVariables().values()) {
                subscriptions.push(this.state.onVariableChange(variableName).subscribe(() => {
                    const newValue = mustache__WEBPACK_IMPORTED_MODULE_0__.default.render(this.template, this.state);
                    if (newValue !== this.value) {
                        this.value = newValue;
                        callback(this.value);
                    }
                }));
            }
            return {
                unsubscribe: () => {
                    for (const subscription of subscriptions) {
                        subscription.unsubscribe();
                    }
                },
            };
        }
        isPureString() {
            return this.ast.length === 0 || (this.ast.length === 1 && this.ast[0][0] === "text");
        }
        getUsedVariables() {
            const variables = new Set();
            this.recursiveGetUsedVariables(this.ast, variables);
            return variables;
        }
        recursiveGetUsedVariables(ast, variables) {
            for (const token of ast) {
                const type = token[0];
                const name = token[1];
                const subAst = token[4];
                if (["name", "&", "#", "^"].includes(type)) {
                    variables.add(name);
                }
                if (subAst !== undefined && typeof subAst !== "string") {
                    this.recursiveGetUsedVariables(subAst, variables);
                }
            }
        }
    }
    //# sourceMappingURL=TemplateValue.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/VariablesExtra.js":
    /*!********************************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/VariablesExtra.js ***!
      \********************************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "VariableDescriptor": () => (/* binding */ VariableDescriptor),
    /* harmony export */   "getAllVariables": () => (/* binding */ getAllVariables)
    /* harmony export */ });
    /* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Properties */ "./node_modules/@workadventure/scripting-api-extra/dist/Properties.js");
    
    class VariableDescriptor {
        constructor(object) {
            this.name = object.name;
            this.x = object.x;
            this.y = object.y;
            this.properties = new _Properties__WEBPACK_IMPORTED_MODULE_0__.Properties(object.properties);
        }
        get isReadable() {
            const readableBy = this.properties.getString("readableBy");
            if (!readableBy) {
                return true;
            }
            return WA.player.tags.includes(readableBy);
        }
        get isWritable() {
            const writableBy = this.properties.getString("writableBy");
            if (!writableBy) {
                return true;
            }
            return WA.player.tags.includes(writableBy);
        }
    }
    async function getAllVariables() {
        const map = WA.room.getTiledMap();
        const variables = new Map();
        getAllVariablesRecursive(map.layers, variables);
        return variables;
    }
    function getAllVariablesRecursive(layers, variables) {
        for (const layer of layers) {
            if (layer.type === "objectgroup") {
                for (const object of layer.objects) {
                    if (object.type === "variable") {
                        variables.set(object.name, new VariableDescriptor(object));
                    }
                }
            }
            else if (layer.type === "group") {
                getAllVariablesRecursive(layer.layers, variables);
            }
        }
    }
    //# sourceMappingURL=VariablesExtra.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/index.js":
    /*!***********************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/index.js ***!
      \***********************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "VariableDescriptor": () => (/* reexport safe */ _VariablesExtra__WEBPACK_IMPORTED_MODULE_0__.VariableDescriptor),
    /* harmony export */   "getAllVariables": () => (/* reexport safe */ _VariablesExtra__WEBPACK_IMPORTED_MODULE_0__.getAllVariables),
    /* harmony export */   "Properties": () => (/* reexport safe */ _Properties__WEBPACK_IMPORTED_MODULE_1__.Properties),
    /* harmony export */   "getLayersMap": () => (/* reexport safe */ _LayersFlattener__WEBPACK_IMPORTED_MODULE_2__.getLayersMap),
    /* harmony export */   "findLayerBoundaries": () => (/* reexport safe */ _LayersExtra__WEBPACK_IMPORTED_MODULE_3__.findLayerBoundaries),
    /* harmony export */   "findLayersBoundaries": () => (/* reexport safe */ _LayersExtra__WEBPACK_IMPORTED_MODULE_3__.findLayersBoundaries),
    /* harmony export */   "initPropertiesTemplates": () => (/* reexport safe */ _Features_properties_templates__WEBPACK_IMPORTED_MODULE_4__.initPropertiesTemplates),
    /* harmony export */   "initDoors": () => (/* reexport safe */ _Features_doors__WEBPACK_IMPORTED_MODULE_5__.initDoors),
    /* harmony export */   "initVariableActionLayer": () => (/* reexport safe */ _Features_variable_actions__WEBPACK_IMPORTED_MODULE_6__.initVariableActionLayer),
    /* harmony export */   "bootstrapExtra": () => (/* reexport safe */ _init__WEBPACK_IMPORTED_MODULE_7__.bootstrapExtra)
    /* harmony export */ });
    /* harmony import */ var _VariablesExtra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VariablesExtra */ "./node_modules/@workadventure/scripting-api-extra/dist/VariablesExtra.js");
    /* harmony import */ var _Properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Properties */ "./node_modules/@workadventure/scripting-api-extra/dist/Properties.js");
    /* harmony import */ var _LayersFlattener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayersFlattener */ "./node_modules/@workadventure/scripting-api-extra/dist/LayersFlattener.js");
    /* harmony import */ var _LayersExtra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayersExtra */ "./node_modules/@workadventure/scripting-api-extra/dist/LayersExtra.js");
    /* harmony import */ var _Features_properties_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Features/properties_templates */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/properties_templates.js");
    /* harmony import */ var _Features_doors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Features/doors */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/doors.js");
    /* harmony import */ var _Features_variable_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Features/variable_actions */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/variable_actions.js");
    /* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./init */ "./node_modules/@workadventure/scripting-api-extra/dist/init.js");
    
    
    
    
    
    
    
    
    //# sourceMappingURL=index.js.map
    
    /***/ }),
    
    /***/ "./node_modules/@workadventure/scripting-api-extra/dist/init.js":
    /*!**********************************************************************!*\
      !*** ./node_modules/@workadventure/scripting-api-extra/dist/init.js ***!
      \**********************************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "bootstrapExtra": () => (/* binding */ bootstrapExtra)
    /* harmony export */ });
    /* harmony import */ var _Features_doors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Features/doors */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/doors.js");
    /* harmony import */ var _Features_special_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Features/special_properties */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/special_properties.js");
    /* harmony import */ var _Features_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Features/configuration */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/configuration.js");
    /* harmony import */ var _Features_properties_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Features/properties_templates */ "./node_modules/@workadventure/scripting-api-extra/dist/Features/properties_templates.js");
    
    
    
    
    function bootstrapExtra() {
        return WA.onInit().then(() => {
            (0,_Features_doors__WEBPACK_IMPORTED_MODULE_0__.initDoors)().catch((e) => console.error(e));
            (0,_Features_special_properties__WEBPACK_IMPORTED_MODULE_1__.initSpecialProperties)().catch((e) => console.error(e));
            (0,_Features_configuration__WEBPACK_IMPORTED_MODULE_2__.initConfiguration)().catch((e) => console.error(e));
            (0,_Features_properties_templates__WEBPACK_IMPORTED_MODULE_3__.initPropertiesTemplates)().catch((e) => console.error(e));
        });
    }
    //# sourceMappingURL=init.js.map
    
    /***/ }),
    
    /***/ "./node_modules/mustache/mustache.mjs":
    /*!********************************************!*\
      !*** ./node_modules/mustache/mustache.mjs ***!
      \********************************************/
    /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
    /* harmony export */ });
    /*!
     * mustache.js - Logic-less {{mustache}} templates with JavaScript
     * http://github.com/janl/mustache.js
     */
    
    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill (object) {
      return objectToString.call(object) === '[object Array]';
    };
    
    function isFunction (object) {
      return typeof object === 'function';
    }
    
    /**
     * More correct typeof string handling array
     * which normally returns typeof 'object'
     */
    function typeStr (obj) {
      return isArray(obj) ? 'array' : typeof obj;
    }
    
    function escapeRegExp (string) {
      return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }
    
    /**
     * Null safe way of checking whether or not an object,
     * including its prototype, has a given property
     */
    function hasProperty (obj, propName) {
      return obj != null && typeof obj === 'object' && (propName in obj);
    }
    
    /**
     * Safe way of detecting whether or not the given thing is a primitive and
     * whether it has the given property
     */
    function primitiveHasOwnProperty (primitive, propName) {
      return (
        primitive != null
        && typeof primitive !== 'object'
        && primitive.hasOwnProperty
        && primitive.hasOwnProperty(propName)
      );
    }
    
    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp (re, string) {
      return regExpTest.call(re, string);
    }
    
    var nonSpaceRe = /\S/;
    function isWhitespace (string) {
      return !testRegExp(nonSpaceRe, string);
    }
    
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    
    function escapeHtml (string) {
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
        return entityMap[s];
      });
    }
    
    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
    
    /**
     * Breaks up the given `template` string into a tree of tokens. If the `tags`
     * argument is given here it must be an array with two string values: the
     * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
     * course, the default is to use mustaches (i.e. mustache.tags).
     *
     * A token is an array with at least 4 elements. The first element is the
     * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
     * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
     * all text that appears outside a symbol this element is "text".
     *
     * The second element of a token is its "value". For mustache tags this is
     * whatever else was inside the tag besides the opening symbol. For text tokens
     * this is the text itself.
     *
     * The third and fourth elements of the token are the start and end indices,
     * respectively, of the token in the original template.
     *
     * Tokens that are the root node of a subtree contain two more elements: 1) an
     * array of tokens in the subtree and 2) the index in the original template at
     * which the closing tag for that section begins.
     *
     * Tokens for partials also contain two more elements: 1) a string value of
     * indendation prior to that tag and 2) the index of that tag on that line -
     * eg a value of 2 indicates the partial is the third tag on this line.
     */
    function parseTemplate (template, tags) {
      if (!template)
        return [];
      var lineHasNonSpace = false;
      var sections = [];     // Stack to hold section tokens
      var tokens = [];       // Buffer to hold the tokens
      var spaces = [];       // Indices of whitespace tokens on the current line
      var hasTag = false;    // Is there a {{tag}} on the current line?
      var nonSpace = false;  // Is there a non-space char on the current line?
      var indentation = '';  // Tracks indentation for tags that use it
      var tagIndex = 0;      // Stores a count of number of tags encountered on a line
    
      // Strips all whitespace tokens array for the current line
      // if there was a {{#tag}} on it and otherwise only space.
      function stripSpace () {
        if (hasTag && !nonSpace) {
          while (spaces.length)
            delete tokens[spaces.pop()];
        } else {
          spaces = [];
        }
    
        hasTag = false;
        nonSpace = false;
      }
    
      var openingTagRe, closingTagRe, closingCurlyRe;
      function compileTags (tagsToCompile) {
        if (typeof tagsToCompile === 'string')
          tagsToCompile = tagsToCompile.split(spaceRe, 2);
    
        if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
          throw new Error('Invalid tags: ' + tagsToCompile);
    
        openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
        closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
        closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
      }
    
      compileTags(tags || mustache.tags);
    
      var scanner = new Scanner(template);
    
      var start, type, value, chr, token, openSection;
      while (!scanner.eos()) {
        start = scanner.pos;
    
        // Match any text between tags.
        value = scanner.scanUntil(openingTagRe);
    
        if (value) {
          for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
            chr = value.charAt(i);
    
            if (isWhitespace(chr)) {
              spaces.push(tokens.length);
              indentation += chr;
            } else {
              nonSpace = true;
              lineHasNonSpace = true;
              indentation += ' ';
            }
    
            tokens.push([ 'text', chr, start, start + 1 ]);
            start += 1;
    
            // Check for whitespace on the current line.
            if (chr === '\n') {
              stripSpace();
              indentation = '';
              tagIndex = 0;
              lineHasNonSpace = false;
            }
          }
        }
    
        // Match the opening tag.
        if (!scanner.scan(openingTagRe))
          break;
    
        hasTag = true;
    
        // Get the tag type.
        type = scanner.scan(tagRe) || 'name';
        scanner.scan(whiteRe);
    
        // Get the tag value.
        if (type === '=') {
          value = scanner.scanUntil(equalsRe);
          scanner.scan(equalsRe);
          scanner.scanUntil(closingTagRe);
        } else if (type === '{') {
          value = scanner.scanUntil(closingCurlyRe);
          scanner.scan(curlyRe);
          scanner.scanUntil(closingTagRe);
          type = '&';
        } else {
          value = scanner.scanUntil(closingTagRe);
        }
    
        // Match the closing tag.
        if (!scanner.scan(closingTagRe))
          throw new Error('Unclosed tag at ' + scanner.pos);
    
        if (type == '>') {
          token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
        } else {
          token = [ type, value, start, scanner.pos ];
        }
        tagIndex++;
        tokens.push(token);
    
        if (type === '#' || type === '^') {
          sections.push(token);
        } else if (type === '/') {
          // Check section nesting.
          openSection = sections.pop();
    
          if (!openSection)
            throw new Error('Unopened section "' + value + '" at ' + start);
    
          if (openSection[1] !== value)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        } else if (type === 'name' || type === '{' || type === '&') {
          nonSpace = true;
        } else if (type === '=') {
          // Set the tags for the next time around.
          compileTags(value);
        }
      }
    
      stripSpace();
    
      // Make sure there are no open sections when we're done.
      openSection = sections.pop();
    
      if (openSection)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    
      return nestTokens(squashTokens(tokens));
    }
    
    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens (tokens) {
      var squashedTokens = [];
    
      var token, lastToken;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];
    
        if (token) {
          if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
            lastToken[1] += token[1];
            lastToken[3] = token[3];
          } else {
            squashedTokens.push(token);
            lastToken = token;
          }
        }
      }
    
      return squashedTokens;
    }
    
    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have two additional items: 1) an array of
     * all tokens that appear in that section and 2) the index in the original
     * template that represents the end of that section.
     */
    function nestTokens (tokens) {
      var nestedTokens = [];
      var collector = nestedTokens;
      var sections = [];
    
      var token, section;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];
    
        switch (token[0]) {
          case '#':
          case '^':
            collector.push(token);
            sections.push(token);
            collector = token[4] = [];
            break;
          case '/':
            section = sections.pop();
            section[5] = token[2];
            collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
            break;
          default:
            collector.push(token);
        }
      }
    
      return nestedTokens;
    }
    
    /**
     * A simple string scanner that is used by the template parser to find
     * tokens in template strings.
     */
    function Scanner (string) {
      this.string = string;
      this.tail = string;
      this.pos = 0;
    }
    
    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function eos () {
      return this.tail === '';
    };
    
    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function scan (re) {
      var match = this.tail.match(re);
    
      if (!match || match.index !== 0)
        return '';
    
      var string = match[0];
    
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
    
      return string;
    };
    
    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function scanUntil (re) {
      var index = this.tail.search(re), match;
    
      switch (index) {
        case -1:
          match = this.tail;
          this.tail = '';
          break;
        case 0:
          match = '';
          break;
        default:
          match = this.tail.substring(0, index);
          this.tail = this.tail.substring(index);
      }
    
      this.pos += match.length;
    
      return match;
    };
    
    /**
     * Represents a rendering context by wrapping a view object and
     * maintaining a reference to the parent context.
     */
    function Context (view, parentContext) {
      this.view = view;
      this.cache = { '.': this.view };
      this.parent = parentContext;
    }
    
    /**
     * Creates a new context using the given view with this context
     * as the parent.
     */
    Context.prototype.push = function push (view) {
      return new Context(view, this);
    };
    
    /**
     * Returns the value of the given name in this context, traversing
     * up the context hierarchy if the value is absent in this context's view.
     */
    Context.prototype.lookup = function lookup (name) {
      var cache = this.cache;
    
      var value;
      if (cache.hasOwnProperty(name)) {
        value = cache[name];
      } else {
        var context = this, intermediateValue, names, index, lookupHit = false;
    
        while (context) {
          if (name.indexOf('.') > 0) {
            intermediateValue = context.view;
            names = name.split('.');
            index = 0;
    
            /**
             * Using the dot notion path in `name`, we descend through the
             * nested objects.
             *
             * To be certain that the lookup has been successful, we have to
             * check if the last object in the path actually has the property
             * we are looking for. We store the result in `lookupHit`.
             *
             * This is specially necessary for when the value has been set to
             * `undefined` and we want to avoid looking up parent contexts.
             *
             * In the case where dot notation is used, we consider the lookup
             * to be successful even if the last "object" in the path is
             * not actually an object but a primitive (e.g., a string, or an
             * integer), because it is sometimes useful to access a property
             * of an autoboxed primitive, such as the length of a string.
             **/
            while (intermediateValue != null && index < names.length) {
              if (index === names.length - 1)
                lookupHit = (
                  hasProperty(intermediateValue, names[index])
                  || primitiveHasOwnProperty(intermediateValue, names[index])
                );
    
              intermediateValue = intermediateValue[names[index++]];
            }
          } else {
            intermediateValue = context.view[name];
    
            /**
             * Only checking against `hasProperty`, which always returns `false` if
             * `context.view` is not an object. Deliberately omitting the check
             * against `primitiveHasOwnProperty` if dot notation is not used.
             *
             * Consider this example:
             * ```
             * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
             * ```
             *
             * If we were to check also against `primitiveHasOwnProperty`, as we do
             * in the dot notation case, then render call would return:
             *
             * "The length of a football field is 9."
             *
             * rather than the expected:
             *
             * "The length of a football field is 100 yards."
             **/
            lookupHit = hasProperty(context.view, name);
          }
    
          if (lookupHit) {
            value = intermediateValue;
            break;
          }
    
          context = context.parent;
        }
    
        cache[name] = value;
      }
    
      if (isFunction(value))
        value = value.call(this.view);
    
      return value;
    };
    
    /**
     * A Writer knows how to take a stream of tokens and render them to a
     * string, given a context. It also maintains a cache of templates to
     * avoid the need to parse the same template twice.
     */
    function Writer () {
      this.templateCache = {
        _cache: {},
        set: function set (key, value) {
          this._cache[key] = value;
        },
        get: function get (key) {
          return this._cache[key];
        },
        clear: function clear () {
          this._cache = {};
        }
      };
    }
    
    /**
     * Clears all cached templates in this writer.
     */
    Writer.prototype.clearCache = function clearCache () {
      if (typeof this.templateCache !== 'undefined') {
        this.templateCache.clear();
      }
    };
    
    /**
     * Parses and caches the given `template` according to the given `tags` or
     * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
     * that is generated from the parse.
     */
    Writer.prototype.parse = function parse (template, tags) {
      var cache = this.templateCache;
      var cacheKey = template + ':' + (tags || mustache.tags).join(':');
      var isCacheEnabled = typeof cache !== 'undefined';
      var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;
    
      if (tokens == undefined) {
        tokens = parseTemplate(template, tags);
        isCacheEnabled && cache.set(cacheKey, tokens);
      }
      return tokens;
    };
    
    /**
     * High-level method that is used to render the given `template` with
     * the given `view`.
     *
     * The optional `partials` argument may be an object that contains the
     * names and templates of partials that are used in the template. It may
     * also be a function that is used to load partial templates on the fly
     * that takes a single argument: the name of the partial.
     *
     * If the optional `config` argument is given here, then it should be an
     * object with a `tags` attribute or an `escape` attribute or both.
     * If an array is passed, then it will be interpreted the same way as
     * a `tags` attribute on a `config` object.
     *
     * The `tags` attribute of a `config` object must be an array with two
     * string values: the opening and closing tags used in the template (e.g.
     * [ "<%", "%>" ]). The default is to mustache.tags.
     *
     * The `escape` attribute of a `config` object must be a function which
     * accepts a string as input and outputs a safely escaped string.
     * If an `escape` function is not provided, then an HTML-safe string
     * escaping function is used as the default.
     */
    Writer.prototype.render = function render (template, view, partials, config) {
      var tags = this.getConfigTags(config);
      var tokens = this.parse(template, tags);
      var context = (view instanceof Context) ? view : new Context(view, undefined);
      return this.renderTokens(tokens, context, partials, template, config);
    };
    
    /**
     * Low-level method that renders the given array of `tokens` using
     * the given `context` and `partials`.
     *
     * Note: The `originalTemplate` is only ever used to extract the portion
     * of the original template that was contained in a higher-order section.
     * If the template doesn't use higher-order sections, this argument may
     * be omitted.
     */
    Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
      var buffer = '';
    
      var token, symbol, value;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        value = undefined;
        token = tokens[i];
        symbol = token[0];
    
        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
        else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
        else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
        else if (symbol === '&') value = this.unescapedValue(token, context);
        else if (symbol === 'name') value = this.escapedValue(token, context, config);
        else if (symbol === 'text') value = this.rawValue(token);
    
        if (value !== undefined)
          buffer += value;
      }
    
      return buffer;
    };
    
    Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
      var self = this;
      var buffer = '';
      var value = context.lookup(token[1]);
    
      // This function is used to render an arbitrary template
      // in the current context by higher-order sections.
      function subRender (template) {
        return self.render(template, context, partials, config);
      }
    
      if (!value) return;
    
      if (isArray(value)) {
        for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
        }
      } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
        buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
      } else if (isFunction(value)) {
        if (typeof originalTemplate !== 'string')
          throw new Error('Cannot use higher-order sections without the original template');
    
        // Extract the portion of the original template that the section contains.
        value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
    
        if (value != null)
          buffer += value;
      } else {
        buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
      }
      return buffer;
    };
    
    Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
      var value = context.lookup(token[1]);
    
      // Use JavaScript's definition of falsy. Include empty arrays.
      // See https://github.com/janl/mustache.js/issues/186
      if (!value || (isArray(value) && value.length === 0))
        return this.renderTokens(token[4], context, partials, originalTemplate, config);
    };
    
    Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
      var filteredIndentation = indentation.replace(/[^ \t]/g, '');
      var partialByNl = partial.split('\n');
      for (var i = 0; i < partialByNl.length; i++) {
        if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
          partialByNl[i] = filteredIndentation + partialByNl[i];
        }
      }
      return partialByNl.join('\n');
    };
    
    Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
      if (!partials) return;
      var tags = this.getConfigTags(config);
    
      var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
      if (value != null) {
        var lineHasNonSpace = token[6];
        var tagIndex = token[5];
        var indentation = token[4];
        var indentedValue = value;
        if (tagIndex == 0 && indentation) {
          indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
        }
        var tokens = this.parse(indentedValue, tags);
        return this.renderTokens(tokens, context, partials, indentedValue, config);
      }
    };
    
    Writer.prototype.unescapedValue = function unescapedValue (token, context) {
      var value = context.lookup(token[1]);
      if (value != null)
        return value;
    };
    
    Writer.prototype.escapedValue = function escapedValue (token, context, config) {
      var escape = this.getConfigEscape(config) || mustache.escape;
      var value = context.lookup(token[1]);
      if (value != null)
        return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
    };
    
    Writer.prototype.rawValue = function rawValue (token) {
      return token[1];
    };
    
    Writer.prototype.getConfigTags = function getConfigTags (config) {
      if (isArray(config)) {
        return config;
      }
      else if (config && typeof config === 'object') {
        return config.tags;
      }
      else {
        return undefined;
      }
    };
    
    Writer.prototype.getConfigEscape = function getConfigEscape (config) {
      if (config && typeof config === 'object' && !isArray(config)) {
        return config.escape;
      }
      else {
        return undefined;
      }
    };
    
    var mustache = {
      name: 'mustache.js',
      version: '4.2.0',
      tags: [ '{{', '}}' ],
      clearCache: undefined,
      escape: undefined,
      parse: undefined,
      render: undefined,
      Scanner: undefined,
      Context: undefined,
      Writer: undefined,
      /**
       * Allows a user to override the default caching strategy, by providing an
       * object with set, get and clear methods. This can also be used to disable
       * the cache by setting it to the literal `undefined`.
       */
      set templateCache (cache) {
        defaultWriter.templateCache = cache;
      },
      /**
       * Gets the default or overridden caching object from the default writer.
       */
      get templateCache () {
        return defaultWriter.templateCache;
      }
    };
    
    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();
    
    /**
     * Clears all cached templates in the default writer.
     */
    mustache.clearCache = function clearCache () {
      return defaultWriter.clearCache();
    };
    
    /**
     * Parses and caches the given template in the default writer and returns the
     * array of tokens it contains. Doing this ahead of time avoids the need to
     * parse templates on the fly as they are rendered.
     */
    mustache.parse = function parse (template, tags) {
      return defaultWriter.parse(template, tags);
    };
    
    /**
     * Renders the `template` with the given `view`, `partials`, and `config`
     * using the default writer.
     */
    mustache.render = function render (template, view, partials, config) {
      if (typeof template !== 'string') {
        throw new TypeError('Invalid template! Template should be a "string" ' +
                            'but "' + typeStr(template) + '" was given as the first ' +
                            'argument for mustache#render(template, view, partials)');
      }
    
      return defaultWriter.render(template, view, partials, config);
    };
    
    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;
    
    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;
    
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mustache);
    
    
    /***/ }),
    
    /***/ "./src/index.ts":
    /*!**********************!*\
      !*** ./src/index.ts ***!
      \**********************/
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    /// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
    const scripting_api_extra_1 = __webpack_require__(/*! @workadventure/scripting-api-extra */ "./node_modules/@workadventure/scripting-api-extra/dist/index.js");
    console.log('Script started successfully');
    function extendedFeatures() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield scripting_api_extra_1.bootstrapExtra();
                console.log('Scripting API Extra loaded successfully');
                const website = yield WA.room.website.get('cinemaScreen');
                console.log('website', website);
                website.x = 800;
                website.y = 1000;
                website.width = 320;
                website.height = 240;
            }
            catch (error) {
                console.error('Scripting API Extra ERROR', error);
            }
        });
    }
    extendedFeatures();
    let currentZone;
    let currentPopup;
    const config = [
        {
            zone: 'needHelp',
            message: 'Do you need some guidance? We are happy to help you out.',
            cta: [
                {
                    label: 'Meet us',
                    className: 'primary',
                    callback: () => WA.openTab('https://play.staging.workadventu.re/@/tcm/workadventure/wa-village'),
                }
            ]
        },
        {
            zone: 'followUs',
            message: 'Hey! Have you already started following us?',
            cta: [
                {
                    label: 'LinkedIn',
                    className: 'primary',
                    callback: () => WA.openTab('https://www.linkedin.com/company/workadventu-re'),
                },
                {
                    label: 'Twitter',
                    className: 'primary',
                    callback: () => WA.openTab('https://twitter.com/workadventure_'),
                }
            ]
        },
    ];
    WA.onEnterZone('needHelp', () => {
        currentZone = 'needHelp';
        openPopup(currentZone, currentZone + 'Popup');
    });
    WA.onEnterZone('followUs', () => {
        currentZone = 'followUs';
        openPopup(currentZone, currentZone + 'Popup');
    });
    WA.onLeaveZone('needHelp', closePopup);
    WA.onLeaveZone('followUs', closePopup);
    function openPopup(zoneName, popupName) {
        const zone = config.find((item) => {
            return item.zone == zoneName;
        });
        if (typeof zone !== 'undefined') {
            // @ts-ignore otherwise we can't use zone.cta object
            currentPopup = WA.openPopup(popupName, zone.message, zone.cta);
        }
    }
    function closePopup() {
        if (typeof currentPopup !== undefined) {
            currentPopup.close();
            currentPopup = undefined;
        }
    }
    
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
    /******/ 			for(var key in definition) {
    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    /******/ 				}
    /******/ 			}
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
    /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 			}
    /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /************************************************************************/
    /******/ 	
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module is referenced by other modules so it can't be inlined
    /******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
    /******/ 	
    /******/ })()
    ;