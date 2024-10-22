﻿/**
* DevExpress HTML/JS Reporting (designer\bands\multiColumn.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var MultiColumn = (function (_super) {
    __extends(MultiColumn, _super);
    function MultiColumn(model, pageWidth, margins, serializer) {
        var _this = _super.call(this, model || {}, serializer, exports.multiColumnSerializationsInfo) || this;
        _this.grayAreaWidth = ko.observable(0);
        _this._disposables.push(_this.realColumnWidth = ko.pureComputed(function () {
            var bandWidth = pageWidth() - margins.left() - margins.right(), result = bandWidth;
            _this.grayAreaWidth(0);
            if (_this.mode() === 'UseColumnWidth') {
                if (_this.columnWidth() > bandWidth) {
                    _this.grayAreaWidth(0);
                    result = bandWidth - _this.columnSpacing();
                }
                else if (_this.columnWidth() > 0) {
                    _this.grayAreaWidth(bandWidth - _this.columnWidth() - _this.columnSpacing());
                    result = _this.columnWidth();
                }
            }
            else if (_this.mode() === 'UseColumnCount' && _this.columnCount() > 1) {
                result = (bandWidth - _this.columnSpacing() * (_this.columnCount() - 1)) / _this.columnCount();
                _this.grayAreaWidth(bandWidth - result - _this.columnSpacing());
            }
            return result;
        }));
        _this._disposables.push(_this.columnWidth.subscribe(function (newVal) { _this.mode('UseColumnWidth'); }));
        _this._disposables.push(_this.columnCount.subscribe(function (newVal) { _this.mode('UseColumnCount'); }));
        return _this;
    }
    MultiColumn.unitProperties = ['columnWidth', 'columnSpacing'];
    return MultiColumn;
}(analytics_elements_1.SerializableModel));
exports.MultiColumn = MultiColumn;
exports.multiColumnSerializationsInfo = [
    { propertyName: 'columnCount', modelName: '@ColumnCount', displayName: 'Column Count', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.ColumnCount', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), from: analytics_utils_1.floatFromModel },
    { propertyName: 'columnWidth', modelName: '@ColumnWidth', displayName: 'Column Width', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.ColumnWidth', defaultVal: 0, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), from: analytics_utils_1.floatFromModel },
    { propertyName: 'columnSpacing', modelName: '@ColumnSpacing', displayName: 'Column Spacing', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.ColumnSpacing', defaultVal: 0, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), from: analytics_utils_1.floatFromModel },
    {
        propertyName: 'layout', modelName: '@Layout', displayName: 'Layout', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Layout', defaultVal: 'DownThenAcross', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'DownThenAcross', displayValue: 'DownThenAcross', localizationId: 'DevExpress.XtraPrinting.ColumnLayout.DownThenAcross' },
            { value: 'AcrossThenDown', displayValue: 'AcrossThenDown', localizationId: 'DevExpress.XtraPrinting.ColumnLayout.AcrossThenDown' }
        ]
    }, {
        propertyName: 'mode', modelName: '@Mode', displayName: 'Mode', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Mode', defaultVal: 'None', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' },
            { value: 'UseColumnCount', displayValue: 'UseColumnCount', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.UseColumnCount' },
            { value: 'UseColumnWidth', displayValue: 'UseColumnWidth', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.UseColumnWidth' }
        ]
    }
];
var MultiColumnSurface = (function (_super) {
    __extends(MultiColumnSurface, _super);
    function MultiColumnSurface(multiColumn, context) {
        var _this = _super.call(this) || this;
        _this._disposables.push(_this.grayAreaWidth = ko.pureComputed(function () {
            return analytics_internal_1.unitsToPixel(multiColumn.grayAreaWidth(), context.measureUnit(), context.zoom());
        }), _this.columnWidth = ko.pureComputed(function () {
            return analytics_internal_1.unitsToPixel(multiColumn.realColumnWidth(), context.measureUnit(), context.zoom());
        }), _this.columnSpacing = ko.pureComputed(function () {
            return analytics_internal_1.unitsToPixel(multiColumn.columnSpacing(), context.measureUnit(), context.zoom());
        }), _this.columnSpacingLeft = ko.pureComputed(function () {
            var columnWidth = _this.columnWidth();
            return !context.rtl() ? columnWidth : context.margins.right() + _this.grayAreaWidth();
        }), _this.grayAreaLeft = ko.pureComputed(function () {
            var columnWidth = _this.columnWidth();
            return !context.rtl() ? columnWidth + _this.columnSpacing() : context.margins.right();
        }), _this.haveColumns = ko.pureComputed(function () {
            return multiColumn.columnCount() > 1 && multiColumn.mode() !== 'None';
        }));
        return _this;
    }
    return MultiColumnSurface;
}(analytics_utils_1.Disposable));
exports.MultiColumnSurface = MultiColumnSurface;
