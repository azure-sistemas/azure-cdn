﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\pivotgridfield.js)
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
var settings_1 = require("../../utils/settings");
var sortBySummary_1 = require("./sortBySummary");
var xrControl_1 = require("../xrControl");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrReport_1 = require("../xrReport");
var PivotGridFieldViewModel = (function (_super) {
    __extends(PivotGridFieldViewModel, _super);
    function PivotGridFieldViewModel(model, parent, serializer) {
        var _this = _super.call(this, analytics_internal_1.cutRefs(model), parent, serializer) || this;
        _this.controlType = 'PivotGridField';
        _this.areaIndexEditable = ko.pureComputed({
            read: function () { return _this.areaIndex(); },
            write: function (newValue) {
                if (newValue >= 0) {
                    var fields = parent['getFieldsFromArea'](_this.area());
                    if (newValue >= fields.length)
                        return;
                    var currentValue = _this.areaIndex(), delta = newValue < currentValue ? 1 : -1, min = Math.min(newValue, currentValue), max = Math.max(newValue, currentValue);
                    fields.forEach(function (field) {
                        var fieldAreaIndex = field.areaIndex();
                        if (min <= fieldAreaIndex && fieldAreaIndex <= max)
                            field.areaIndex(fieldAreaIndex + delta);
                    });
                    _this.areaIndex(newValue);
                }
            }
        });
        _this._disposables.push(_this.area.subscribe(function (newValue) {
            _this.areaIndex(parent['getFieldsFromArea'](_this.area()).length - 1);
        }));
        _this.sortBySummaryInfo = new sortBySummary_1.SortBySummaryInfo(_this.sortBySummaryInfo || {}, _this, serializer);
        return _this;
    }
    PivotGridFieldViewModel.createNew = function (parent) {
        return function () {
            return new PivotGridFieldViewModel({}, ko.unwrap(parent), null);
        };
    };
    PivotGridFieldViewModel.prototype.getFieldType = function () {
        var _this = this;
        var report = this.root;
        if (!report || !(report instanceof xrReport_1.ReportViewModel))
            return;
        var dataBindingsProvider = report.dataBindingsProvider && report.dataBindingsProvider();
        var resultItem;
        if (dataBindingsProvider) {
            dataBindingsProvider.getItems(new analytics_utils_1.PathRequest(this.getPath(''))).done(function (result) {
                resultItem = analytics_internal_1.findFirstItemMatchesCondition(result, function (x) { return x.name === _this.fieldName(); });
            });
        }
        if (resultItem && resultItem.specifics)
            return resultItem.specifics;
    };
    PivotGridFieldViewModel.prototype.getInfo = function () {
        return this.getControlFactory().controlsMap['PivotGridField'].info;
    };
    PivotGridFieldViewModel.prototype.getControlFactory = function () {
        return settings_1.controlsFactory();
    };
    PivotGridFieldViewModel.prototype.getPath = function (propertyName) {
        return analytics_internal_1.getFullPath(this.parentModel()['getPath'](''), this.parentModel()['dataMember']());
    };
    PivotGridFieldViewModel.prototype.getDisplayName = function () {
        return this.caption() || this.fieldName() || this.name() || this['displayName'] && this['displayName']();
    };
    PivotGridFieldViewModel.fieldHeight = 20;
    return PivotGridFieldViewModel;
}(analytics_elements_1.ElementViewModel));
exports.PivotGridFieldViewModel = PivotGridFieldViewModel;
var PivotGridFieldSurface = (function (_super) {
    __extends(PivotGridFieldSurface, _super);
    function PivotGridFieldSurface(control, context) {
        var _this = _super.call(this, control, context, null) || this;
        _this.isIntersect = ko.computed(function () { return false; });
        _this.displayText = function () {
            return control.caption() || control.fieldName() || (control['displayName']() || '');
        };
        _this._disposables.push(ko.computed(function () {
            _this._width(control['width']() * context.zoom());
            _this._height(PivotGridFieldViewModel.fieldHeight * context.zoom());
        }));
        _this.template = 'dxrd-pivotgrid-field';
        _this.selectiontemplate = 'dxrd-pivotgrid-field-selection';
        _this.area = control.area;
        _this.areaIndex = control.areaIndex;
        _this._disposables.push(_this.minWidth = ko.pureComputed(function () {
            return _this.area() === 'ColumnArea' || _this.area() === 'FilterArea' ? 100 : 0;
        }));
        _this._disposables.push(_this.positionWidthWithoutZoom = ko.pureComputed(function () {
            return _this['position'].width() / _this._context.zoom();
        }));
        return _this;
    }
    return PivotGridFieldSurface;
}(xrControl_1.XRControlSurfaceBase));
exports.PivotGridFieldSurface = PivotGridFieldSurface;
