﻿/**
* DevExpress HTML/JS Reporting (designer\utils\base64ImageParser.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base64ImageParser = (function () {
    function Base64ImageParser() {
    }
    Base64ImageParser.getImageRatio = function (data, format) {
        var imageRatio = { x: 1, y: 1 };
        var byteArray = this._getDataChunks(data, format);
        if (format === 'png') {
            if (!this._pngHasDpiChunks(data) || byteArray.length < 8)
                return imageRatio;
            var dpiX = this._countDpiFromBytes(byteArray.slice(0, 4));
            var dpiY = this._countDpiFromBytes(byteArray.slice(4, 8));
        }
        if (format === 'jpg' || format === 'jpeg') {
            if (byteArray.length < 4)
                return imageRatio;
            var dpiX = this._countDpiFromBytes(byteArray.slice(0, 2));
            var dpiY = this._countDpiFromBytes(byteArray.slice(2, 4));
        }
        if (dpiX && dpiY) {
            var ppi = this.getMonitorPPI();
            imageRatio.x = ppi / dpiX;
            imageRatio.y = ppi / dpiY;
        }
        return imageRatio;
    };
    Base64ImageParser._getDataChunks = function (encoded, format) {
        var byteArray = [];
        if (!encoded)
            return [];
        var decodeString = atob(encoded);
        var startOfChunks = format === 'png' ? decodeString.indexOf('pHYs') + 4 : 14;
        if (startOfChunks == 3 || startOfChunks >= decodeString.length)
            return [];
        for (var i = startOfChunks; i < decodeString.length; i++) {
            byteArray.push(decodeString.charCodeAt(i));
        }
        return byteArray;
    };
    Base64ImageParser._countDpiFromBytes = function (byteArray) {
        var defaultValuePerMeter = 39.370;
        if (byteArray && byteArray.length == 4)
            return ((byteArray[0] << 24) + (byteArray[1] << 16) + (byteArray[2] << 8) + byteArray[3]) / defaultValuePerMeter;
        if (byteArray && byteArray.length == 2)
            return (byteArray[0] << 8) + byteArray[1];
    };
    Base64ImageParser._pngHasDpiChunks = function (data) {
        return data.indexOf('AAlwSFlz') != -1 || data.indexOf('AAAJcEhZ') != -1 || data.indexOf('AAAACXBI') != -1;
    };
    Base64ImageParser.getMonitorPPI = function () {
        var el = document.createElement('div');
        el.style.width = '1in';
        document.body.appendChild(el);
        var ppi = el.offsetWidth;
        document.body.removeChild(el);
        return ppi;
    };
    return Base64ImageParser;
}());
exports.Base64ImageParser = Base64ImageParser;
