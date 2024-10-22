﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressionableFontEditor.js)
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
var _expressionableFontModel_1 = require("../internal/_expressionableFontModel");
var metadata_1 = require("../controls/metadata/properties/metadata");
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ExpressionableFontEditor = (function (_super) {
    __extends(ExpressionableFontEditor, _super);
    function ExpressionableFontEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    ExpressionableFontEditor.prototype.createObjectProperties = function () {
        var model = new _expressionableFontModel_1.ExpressionableFontModel(this.value, this._model);
        this._disposables.push(model);
        return new analytics_widgets_1.ObjectProperties(ko.observable(model), {
            editors: metadata_1.expressionableFontInfo
        }, this.level + 1, this.disabled, undefined, this.textToSearch);
    };
    return ExpressionableFontEditor;
}(analytics_widgets_1.FontEditor));
exports.ExpressionableFontEditor = ExpressionableFontEditor;
