﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formatStringEditor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _formatStringService_1 = require("../services/_formatStringService");
var settings_1 = require("../utils/settings");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var FormatStringEditor = (function (_super) {
    __extends(FormatStringEditor, _super);
    function FormatStringEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormatStringEditor.prototype, "actions", {
        get: function () { return _formatStringService_1.FormatStringService.actions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormatStringEditor.prototype, "customPatterns", {
        get: function () { return settings_1.formatStringEditorCustomSet; },
        enumerable: true,
        configurable: true
    });
    return FormatStringEditor;
}(analytics_widgets_1.Editor));
exports.FormatStringEditor = FormatStringEditor;
