﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\undoEditors.js)
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
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ComboboxUndoEditor = (function (_super) {
    __extends(ComboboxUndoEditor, _super);
    function ComboboxUndoEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    ComboboxUndoEditor.prototype.generateValue = function (undoEngine) {
        var _this = this;
        if (!this.undoValue) {
            this._disposables.push(this.undoValue = ko.computed({
                read: function () {
                    return _this.value();
                },
                write: function (val) {
                    undoEngine().start();
                    _this.value(val);
                    undoEngine().end();
                }
            }));
        }
        return this.undoValue;
    };
    return ComboboxUndoEditor;
}(analytics_widgets_1.Editor));
exports.ComboboxUndoEditor = ComboboxUndoEditor;
