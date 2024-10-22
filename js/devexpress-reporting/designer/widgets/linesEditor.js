﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\linesEditor.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var LinesEditor = (function (_super) {
    __extends(LinesEditor, _super);
    function LinesEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collapsed = ko.observable(false);
        return _this;
    }
    LinesEditor.prototype._shouldSkipHighlighting = function (propertyName) {
        return false;
    };
    return LinesEditor;
}(analytics_widgets_1.Editor));
exports.LinesEditor = LinesEditor;
