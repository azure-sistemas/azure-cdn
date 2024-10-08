﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../settings");
var $ = require("jquery");
function getCurrentResolution(zoom) {
    return Math.floor((zoom || 1) * settings_1.previewDefaultResolution());
}
exports.getCurrentResolution = getCurrentResolution;
function getImageBase64(url) {
    var deferred = $.Deferred();
    var background = new Image();
    background.src = url;
    background.crossOrigin = 'anonymous';
    background.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = background.width;
        canvas.height = background.height;
        canvas.getContext('2d').drawImage(background, 0, 0);
        try {
            deferred.resolve(canvas.toDataURL());
        }
        catch (e) {
            deferred.reject(e);
        }
    };
    return deferred.promise();
}
exports.getImageBase64 = getImageBase64;
function getEnumValues(enumType) {
    return Object.keys(enumType).filter(function (key) { return !isNaN(Number(enumType[key])); });
}
exports.getEnumValues = getEnumValues;
function safelyRunWindowOpen(url, target) {
    if (target === void 0) { target = '_blank'; }
    var newWindow = window.open(url, target);
    target === '_blank' && newWindow && (newWindow.opener = newWindow);
    return newWindow;
}
exports.safelyRunWindowOpen = safelyRunWindowOpen;
