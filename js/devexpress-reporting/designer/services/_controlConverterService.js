﻿/**
* DevExpress HTML/JS Reporting (designer\services\_controlConverterService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../utils/settings");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ControlConverterService = (function () {
    function ControlConverterService() {
    }
    ControlConverterService.getXmlStringFromJson = function (controlJsonLayout, doneCallback, errorCallback) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'jsonToXmlString', JSON.stringify({ 'XRControlSerializer': { 'Controls': { 'Item1': controlJsonLayout } } }))
            .done(function (result) { return doneCallback(result); })
            .fail(function (error) {
            var message = analytics_internal_1.getErrorMessage(error);
            message && analytics_internal_1.ShowMessage(message);
            errorCallback(error);
        });
    };
    ControlConverterService.getControlModelFromXmlString = function (controlXmlLayout, doneCallback, errorCallback) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'xmlStringToJson', controlXmlLayout)
            .done(function (result) { return doneCallback(JSON.parse(result).XRControlSerializer.Controls.Item1); })
            .fail(function (error) {
            var message = analytics_internal_1.getErrorMessage(error);
            message && analytics_internal_1.ShowMessage(message);
            errorCallback(error);
        });
    };
    return ControlConverterService;
}());
exports.ControlConverterService = ControlConverterService;
