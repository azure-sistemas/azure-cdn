﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceEditor.js)
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
var DataSourceEditor = (function (_super) {
    __extends(DataSourceEditor, _super);
    function DataSourceEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourceEditor.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._getEditorOptions = null;
    };
    DataSourceEditor.prototype.getEditorOptions = function (dataSourceHelper, undoEngine, popupContainer) {
        if (!this._getEditorOptions) {
            var _dataSourceHelper = ko.unwrap(dataSourceHelper);
            var items = ko.computed(function () { return _dataSourceHelper && _dataSourceHelper.usedDataSources(); });
            this._disposables.push(items);
            this._getEditorOptions = {
                items: items,
                value: _dataSourceHelper && _dataSourceHelper.dataSourceValue(this.value, undoEngine),
                valueExpr: 'name',
                displayExpr: _dataSourceHelper && _dataSourceHelper.dataSourceDisplayExpr,
                displayCustomValue: true,
                disabled: this.disabled,
                dropDownOptions: { container: popupContainer },
                popupPosition: { boundary: popupContainer },
                useItemTextAsTitle: true
            };
        }
        return this._getEditorOptions;
    };
    return DataSourceEditor;
}(analytics_widgets_1.Editor));
exports.DataSourceEditor = DataSourceEditor;
