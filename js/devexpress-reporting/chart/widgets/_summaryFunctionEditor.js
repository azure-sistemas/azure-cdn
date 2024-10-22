﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_summaryFunctionEditor.js)
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
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var SummaryFunctionModel = (function () {
    function SummaryFunctionModel(functionName, args) {
        var _this = this;
        this.functionName = ko.observable();
        this.args = ko.observableArray();
        this.functionName(functionName);
        this.args(args.map(function (x) { return { value: ko.observable(x) }; }));
        this.functionName.subscribe(function (newVal) {
            _this._updateArgs(newVal);
        });
    }
    SummaryFunctionModel.from = function (val) {
        var functionName = null, args = [];
        if (val) {
            functionName = val.split('(')[0];
            args = val.split('(')[1].split(')')[0].split(',');
            if (args[0] === '') {
                args = [];
            }
            else {
                args = args.map(function (x) { return x.split('[')[1].split(']')[0]; });
            }
        }
        return new SummaryFunctionModel(functionName, args);
    };
    SummaryFunctionModel.toJson = function (value) {
        if (!value.functionName()) {
            return {};
        }
        return value.functionName() + '(' + value.args().map(function (x) { return '[' + x.value() + ']'; }).join(',') + ')';
    };
    SummaryFunctionModel.prototype._updateArgs = function (functionName) {
        if (SummaryFunctionModel.availableItems.indexOf(functionName) !== -1) {
            if (functionName === 'COUNT' || !functionName) {
                this.args([]);
            }
            else if (this.args().length === 0) {
                this.args.push({ value: ko.observable('') });
            }
            else if (this.args().length > 1) {
                this.args.splice(1, this.args().length - 1);
            }
        }
    };
    SummaryFunctionModel.availableItems = ['SUM', 'MIN', 'MAX', 'AVERAGE', 'COUNT'];
    return SummaryFunctionModel;
}());
exports.SummaryFunctionModel = SummaryFunctionModel;
var SummaryFunctionEditor = (function (_super) {
    __extends(SummaryFunctionEditor, _super);
    function SummaryFunctionEditor(modelPropertyInfo, level, parentDisabled) {
        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled) || this;
        _this.argumentTemplateName = ko.bindingHandlers['displayNameExtender'] ? 'dxrd-field' : 'dxcd-field';
        _this.actionsAreAvailable = ko.observable(false);
        var subscription = null;
        _this.memberPadding = { paddingLeft: (level + 1) * analytics_widgets_internal_1.propertiesGridEditorsPaddingLeft() };
        _this._model.subscribe(function (newVal) {
            subscription && subscription.dispose();
            subscription = ko.computed(function () {
                _this.actionsAreAvailable(_this.value().functionName() && SummaryFunctionModel.availableItems.indexOf(_this.value() && _this.value().functionName()) === -1);
            });
        });
        return _this;
    }
    SummaryFunctionEditor.prototype.getLocalization = function (displayName, localizationId) {
        return analytics_utils_1.getLocalization(displayName, localizationId);
    };
    SummaryFunctionEditor.prototype.add = function () {
        this.value().args.push({ value: ko.observable('') });
    };
    SummaryFunctionEditor.prototype.remove = function (index) {
        this.value().args.splice(index, 1);
    };
    SummaryFunctionEditor.prototype.availableItems = function () {
        return SummaryFunctionModel.availableItems;
    };
    return SummaryFunctionEditor;
}(analytics_widgets_1.FieldListEditor));
exports.SummaryFunctionEditor = SummaryFunctionEditor;
