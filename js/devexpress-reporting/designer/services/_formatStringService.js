﻿/**
* DevExpress HTML/JS Reporting (designer\services\_formatStringService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../utils/settings");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var FormatStringService = (function () {
    function FormatStringService() {
    }
    FormatStringService.saveCustomPattern = function (typeString, format) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'formatString', encodeURIComponent(JSON.stringify({ action: 'save', typeString: typeString, customFormatString: format })));
    };
    FormatStringService.removeCustomPattern = function (typeString, format) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'formatString', encodeURIComponent(JSON.stringify({ action: 'remove', typeString: typeString, customFormatString: format })));
    };
    FormatStringService.updatePreview = function (value, typeString, format) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'formatStringPreview', encodeURIComponent(JSON.stringify({ value: value, typeString: typeString, formatString: format })));
    };
    FormatStringService.actions = { updatePreview: FormatStringService.updatePreview, removeCustomPattern: FormatStringService.removeCustomPattern, saveCustomPattern: FormatStringService.saveCustomPattern };
    return FormatStringService;
}());
exports.FormatStringService = FormatStringService;
