﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDependencyEditor.js)
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
var $ = require("jquery");
var ChartDependencyEditor = (function (_super) {
    __extends(ChartDependencyEditor, _super);
    function ChartDependencyEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    ChartDependencyEditor.prototype.getDependencyOptions = function (templateOptions, propertyName, depPropertyName) {
        var _this = this;
        if (!this.bindableOptions) {
            var debObj = {};
            this.depProperty = ko.computed(function () { return _this._model() && _this._model()[depPropertyName](); });
            this._disposables.push(this.depProperty);
            debObj[propertyName] = this.depProperty;
            this.bindableOptions = $.extend({}, this.getOptions(templateOptions), debObj);
        }
        return this.bindableOptions;
    };
    return ChartDependencyEditor;
}(analytics_widgets_1.Editor));
exports.ChartDependencyEditor = ChartDependencyEditor;
