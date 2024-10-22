﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataSourceEditor.js)
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
var ChartDataSourceEditor = (function (_super) {
    __extends(ChartDataSourceEditor, _super);
    function ChartDataSourceEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = null;
        return _this;
    }
    ChartDataSourceEditor.prototype.generateOptions = function (dataSources, popupContainer) {
        var _this = this;
        if (!this.options) {
            var disabled = ko.computed(function () {
                return _this.disabled() || !dataSources() || dataSources().length === 0;
            });
            var value = ko.computed({
                read: function () {
                    var unwrappedDataSources = dataSources();
                    var dataSource = unwrappedDataSources.filter(function (x) { return !!x && (x.value === _this.value()); })[0];
                    return ko.unwrap(dataSource && dataSource.displayName);
                },
                write: function (newVal) {
                    var unwrappedDataSources = dataSources();
                    var dataSource = unwrappedDataSources.filter(function (x) { return !!x && (ko.unwrap(x.displayName) === newVal); })[0];
                    _this.value(dataSource && dataSource.value);
                }
            });
            this._disposables.push(value);
            this._disposables.push(disabled);
            this.options = {
                displayExpr: 'displayName',
                dataSource: dataSources,
                disabled: disabled,
                value: value,
                valueExpr: 'displayName',
                displayCustomValue: true,
                dropDownOptions: { container: popupContainer }
            };
        }
        return this.options;
    };
    return ChartDataSourceEditor;
}(analytics_widgets_1.Editor));
exports.ChartDataSourceEditor = ChartDataSourceEditor;
