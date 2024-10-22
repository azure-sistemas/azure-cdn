﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\reportFieldListEditor.js)
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
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ReportFieldListEditor = (function (_super) {
    __extends(ReportFieldListEditor, _super);
    function ReportFieldListEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
        _this.treeListController = new ReportTreeListController();
        _this._disposables.push(_this.treeListController.selectedItemData.subscribe(function (newValue) {
            if (_this._model()['setDataMemberInfo'])
                _this._model()['setDataMemberInfo'](newValue);
        }));
        return _this;
    }
    return ReportFieldListEditor;
}(analytics_widgets_1.FieldListEditor));
exports.ReportFieldListEditor = ReportFieldListEditor;
var ReportTreeListController = (function (_super) {
    __extends(ReportTreeListController, _super);
    function ReportTreeListController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedItemData = ko.observable();
        return _this;
    }
    ReportTreeListController.prototype.select = function (value) {
        _super.prototype.select.call(this, value);
        this.selectedItemData(this.selectedItem && this.selectedItem._data && this.selectedItem._data());
    };
    return ReportTreeListController;
}(analytics_widgets_internal_1.TreeListController));
