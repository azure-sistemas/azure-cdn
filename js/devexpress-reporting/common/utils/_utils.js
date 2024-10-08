﻿/**
* DevExpress HTML/JS Reporting (common\utils\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.cultureInfo = {};
exports.generateGuid = function () {
    var getNewQuartet = function (i) {
        return Math.floor((1 + Math.random()) * Math.pow(0x10000, i)).toString(16).substring(1);
    };
    return getNewQuartet(2) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(3);
};
var commonBlur = HTMLElement.prototype.blur;
var fullscreenEventsList = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'];
function createFullscreenComputed(element, parent) {
    var _fullscreen = ko.observable(false);
    var func = function () {
        var isFullscreen = document.fullscreen || !!document['msFullscreenElement'] || !!document['webkitFullscreenElement'];
        if (element['msRequestFullscreen']) {
            HTMLElement.prototype.blur = isFullscreen ? function () {
                try {
                    commonBlur.apply(this);
                }
                catch (e) {
                    document.body.blur();
                }
            } : commonBlur;
        }
        _fullscreen(isFullscreen);
    };
    var fullscreen = ko.computed({
        read: function () { return _fullscreen(); },
        write: function (newVal) {
            _fullscreen(newVal);
            toggleFullscreen(element, newVal);
        }
    });
    addFullscreenListener(document, func);
    parent._disposables.push({
        dispose: function () {
            removeFullscreenListener(document, func);
            commonBlur = null;
            func = null;
        }
    }, fullscreen);
    return fullscreen;
}
exports.createFullscreenComputed = createFullscreenComputed;
function processZoomFactor(accessibilityCompliant) {
    if (!accessibilityCompliant)
        return;
    var defaultFontSize = 16;
    var zoomFactor = (parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size')) || defaultFontSize) / defaultFontSize;
    if (zoomFactor !== analytics_internal_1.accessibilityFontSizeZoomFactor()) {
        analytics_widgets_internal_1.propertiesGridEditorsPaddingLeft(zoomFactor * analytics_widgets_internal_1.propertiesGridEditorsPaddingLeft());
        analytics_internal_1.accessibilityFontSizeZoomFactor(zoomFactor);
    }
}
exports.processZoomFactor = processZoomFactor;
function addFullscreenListener(element, func) {
    fullscreenEventsList.forEach(function (eventName) {
        element.addEventListener(eventName, func);
    });
}
function removeFullscreenListener(element, func) {
    fullscreenEventsList.forEach(function (eventName) {
        element.removeEventListener(eventName, func);
    });
}
function showFullscreen(element) {
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element['mozRequestFullScreen'])
        element['mozRequestFullScreen']();
    else if (element['webkitRequestFullscreen'])
        element['webkitRequestFullscreen']();
    else if (element['msRequestFullscreen']) {
        element['msRequestFullscreen']();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document['mozCancelFullScreen'])
        document['mozCancelFullScreen']();
    else if (document['webkitExitFullscreen'])
        document['webkitExitFullscreen']();
    else if (document['msExitFullscreen']) {
        HTMLElement.prototype.blur = commonBlur;
        document['msExitFullscreen']();
    }
}
function toggleFullscreen(element, value) {
    if (!element)
        return;
    if (value)
        showFullscreen(element);
    else
        exitFullscreen();
}
function transformNewLineCharacters(value) {
    return value.replace(/(\r\n|\n|\r)/g, '\r\n');
}
exports.transformNewLineCharacters = transformNewLineCharacters;
