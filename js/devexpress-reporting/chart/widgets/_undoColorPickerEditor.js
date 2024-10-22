﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_undoColorPickerEditor.js)
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
var UndoColorPickerEditor = (function (_super) {
    __extends(UndoColorPickerEditor, _super);
    function UndoColorPickerEditor(info, level, parentDisabled) {
        return _super.call(this, info, level, parentDisabled) || this;
    }
    UndoColorPickerEditor.prototype.generateValue = function (undoEngine) {
        var _this = this;
        if (!this.generatedValue) {
            this._disposables.push(this.generatedValue = ko.computed({
                read: function () { return _this.displayValue(); },
                write: function (newVal) {
                    undoEngine().start();
                    _this.displayValue(newVal);
                    undoEngine().end();
                }
            }));
        }
        return this.generatedValue;
    };
    return UndoColorPickerEditor;
}(analytics_widgets_1.ColorPickerEditor));
exports.UndoColorPickerEditor = UndoColorPickerEditor;
