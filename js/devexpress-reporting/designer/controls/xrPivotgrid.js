﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPivotgrid.js)
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
var pivotgridfield_1 = require("./pivotgrid/pivotgridfield");
var xrControl_1 = require("./xrControl");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var $ = require("jquery");
function comparerFields(firstField, secondField) {
    return firstField.areaIndex() - secondField.areaIndex();
}
var XRPivotGridViewModel = (function (_super) {
    __extends(XRPivotGridViewModel, _super);
    function XRPivotGridViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.fields = analytics_utils_1.deserializeArray(model && model.Fields || [], function (item) { return new pivotgridfield_1.PivotGridFieldViewModel(item, _this, serializer); });
        _this._disposables.push(_this.fields.subscribe(function () {
            ['FilterArea', 'DataArea', 'ColumnArea', 'RowArea'].forEach(function (area) {
                var areaFields = _this.getFieldsFromArea(area);
                for (var index = 0; index < areaFields.length; index++) {
                    areaFields[index].areaIndex(index);
                }
            });
        }));
        _this.addFieldToArea = function (area) {
            if (_this.lockedInUserDesigner())
                return;
            var newField = new pivotgridfield_1.PivotGridFieldViewModel({ '@ControlType': 'PivotGridField', '@Area': area }, _this, serializer);
            newField.index(_this.fields().length);
            newField.areaIndex(_this.getFieldsFromArea(area).length);
            _this.fields.push(newField);
        };
        _this._initCriteriaString();
        return _this;
    }
    XRPivotGridViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.fields);
        this.resetObservableArray(this.fields);
    };
    XRPivotGridViewModel.prototype._initCriteriaString = function () {
        var _this = this;
        this.prefilter.criteriaString = new analytics_widgets_1.FilterStringOptions(this.prefilter._criteriaString);
        this.prefilter.criteriaString.helper.canChoiceParameters = false;
        this.prefilter.criteriaString.helper.canChoiceProperty = false;
        this.prefilter.criteriaString.helper.getDisplayPropertyName = function (path, name) {
            var field = analytics_internal_1.find(_this.fields.peek(), function (f) { return f.name() === name; });
            return $.Deferred()
                .resolve(field ? field.getDisplayName() : name)
                .promise();
        };
        this.prefilter.parent = this;
    };
    XRPivotGridViewModel.prototype.removeChild = function (selectedField) {
        this.fields.splice(this.fields().indexOf(selectedField), 1);
    };
    XRPivotGridViewModel.prototype.getFieldsFromArea = function (area) {
        var result = [];
        result.push.apply(result, this.fields().filter(function (field) { return field.area() === area; }));
        return result.sort(comparerFields);
    };
    XRPivotGridViewModel.prototype.getPath = function (propertyName) {
        return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this.dataSource());
    };
    return XRPivotGridViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRPivotGridViewModel = XRPivotGridViewModel;
var XRPivotGridSurface = (function (_super) {
    __extends(XRPivotGridSurface, _super);
    function XRPivotGridSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.contenttemplate = 'dxrd-pivotgrid-content';
        _this.selectiontemplate = 'dxrd-pivotgrid-selection';
        _this._disposables.push(_this.filterFields = ko.pureComputed(function () {
            return _this.getAreaFields('FilterArea');
        }));
        _this._disposables.push(_this.dataFields = ko.pureComputed(function () {
            return _this.getAreaFields('DataArea');
        }));
        _this._disposables.push(_this.columnFields = ko.pureComputed(function () {
            return _this.getAreaFields('ColumnArea');
        }));
        _this._disposables.push(_this.rowFields = ko.pureComputed(function () {
            return _this.getAreaFields('RowArea');
        }));
        _this._disposables.push(_this.totalsHeight = ko.pureComputed(function () {
            return _this.columnFields().length > 0 ? _this.columnFields().length * pivotgridfield_1.PivotGridFieldViewModel.fieldHeight : pivotgridfield_1.PivotGridFieldViewModel.fieldHeight;
        }));
        _this._disposables.push(_this.rowHeaderHeight = ko.pureComputed(function () {
            return _this.totalsHeight() + (_this.dataFields().length > 0 ? pivotgridfield_1.PivotGridFieldViewModel.fieldHeight : 0) + 8;
        }));
        _this._disposables.push(_this.totalsDataFieldWidth = ko.pureComputed(function () {
            return _this.getTotalsAreaFieldWidth('DataArea', context.zoom());
        }));
        _this._disposables.push(_this.totalsRowFieldWidth = ko.pureComputed(function () {
            return _this.getTotalsAreaFieldWidth('RowArea', context.zoom());
        }));
        return _this;
    }
    XRPivotGridSurface.prototype._getChildrenHolderName = function () { return 'fields'; };
    XRPivotGridSurface.prototype.getAreaFields = function (area) {
        return this.fields().filter(function (field) { return field.area() === area; }).sort(comparerFields);
    };
    XRPivotGridSurface.prototype.getTotalsAreaFieldWidth = function (area, zoom) {
        var total = 0, areaFields = this.getAreaFields(area);
        areaFields.forEach(function (field) { total += field.rect().width; });
        return areaFields.length > 0 ? total / zoom : 100;
    };
    XRPivotGridSurface.prototype.getAdornTemplate = function () {
        return this.isIntersect() ? 'dxrd-intersect' : '';
    };
    XRPivotGridSurface.prototype.isThereIntersectionWithChildCollection = function () {
        return false;
    };
    return XRPivotGridSurface;
}(xrControl_1.XRControlSurface));
exports.XRPivotGridSurface = XRPivotGridSurface;
