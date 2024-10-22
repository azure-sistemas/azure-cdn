﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.js)
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
var _locker_1 = require("../../../common/utils/_locker");
var _parametersPopup_1 = require("../../mobile/internal/_parametersPopup");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _dateRangeKeyboardHelper_1 = require("../../accessibility/_dateRangeKeyboardHelper");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var CSDateTime = (function () {
    function CSDateTime(_date) {
        if (_date === void 0) { _date = null; }
        this._date = _date;
    }
    Object.defineProperty(CSDateTime, "today", {
        get: function () {
            return new CSDateTime().now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSDateTime.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSDateTime.prototype, "day", {
        get: function () {
            return this._date.getDay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSDateTime.prototype, "month", {
        get: function () {
            return this._date.getMonth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSDateTime.prototype, "year", {
        get: function () {
            return this._date.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    CSDateTime.prototype.addMonths = function (months) {
        return new CSDateTime(new Date(this._date.setMonth(CSDateTime.today.month + months)));
    };
    CSDateTime.prototype.addDays = function (days) {
        var newDate = this.date.getDate() + days;
        return new CSDateTime(new Date(this._date.setDate(newDate)));
    };
    CSDateTime.prototype.addHours = function (hours) {
        var newDate = this.date.getHours() + hours;
        return new CSDateTime(new Date(this._date.setHours(newDate)));
    };
    CSDateTime.prototype.addYears = function (years) {
        return new CSDateTime(new Date(this._date.setFullYear(this._date.getFullYear() + years)));
    };
    CSDateTime.prototype.now = function () {
        return new CSDateTime(new Date(new Date().setHours(0, 0, 0, 0)));
    };
    return CSDateTime;
}());
function createRangeItem(displayName, localizationId, range) {
    var item = {
        displayName: analytics_utils_1.getLocalization(displayName, localizationId),
        range: range
    };
    Object.defineProperty(item, 'displayName', {
        get: function () { return analytics_utils_1.getLocalization(displayName, localizationId); },
        configurable: true
    });
    return item;
}
exports.predefinedDateRanges = [
    createRangeItem('Today', 'PreviewStringId.DateRangeParameterEditor_Today', function () { return [
        CSDateTime.today.date,
        CSDateTime.today.date
    ]; }),
    createRangeItem('Yesterday', 'PreviewStringId.DateRangeParameterEditor_Yesterday', function () { return [
        CSDateTime.today.addDays(-1).date,
        CSDateTime.today.addDays(-1).date
    ]; }),
    createRangeItem('Current Week', 'PreviewStringId.DateRangeParameterEditor_CurrentWeek', function () { return [
        CSDateTime.today.addDays(-CSDateTime.today.day).date,
        CSDateTime.today.addDays(-CSDateTime.today.day).addDays(6).date
    ]; }),
    createRangeItem('Last Week', 'PreviewStringId.DateRangeParameterEditor_LastWeek', function () { return [
        CSDateTime.today.addDays(-7).date,
        CSDateTime.today.date
    ]; }),
    createRangeItem('Previous Week', 'PreviewStringId.DateRangeParameterEditor_PreviousWeek', function () { return [
        CSDateTime.today.addDays(-CSDateTime.today.day - 7).date,
        CSDateTime.today.addDays(-CSDateTime.today.day - 1).date
    ]; }),
    createRangeItem('Current Month', 'PreviewStringId.DateRangeParameterEditor_CurrentMonth', function () { return [
        new Date(CSDateTime.today.year, CSDateTime.today.month, 1),
        new Date(CSDateTime.today.year, CSDateTime.today.month + 1, 0),
    ]; }),
    createRangeItem('Last Month', 'PreviewStringId.DateRangeParameterEditor_LastMonth', function () { return [
        CSDateTime.today.addMonths(-1).date,
        CSDateTime.today.date
    ]; }),
    createRangeItem('Previous Month', 'PreviewStringId.DateRangeParameterEditor_PreviousMonth', function () { return [
        new Date(CSDateTime.today.year, CSDateTime.today.month - 1, 1),
        new Date(CSDateTime.today.year, CSDateTime.today.month, 0),
    ]; }),
    createRangeItem('Current Quarter', 'PreviewStringId.DateRangeParameterEditor_CurrentQuarter', function () { return [
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3).date,
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3 + 3).date,
    ]; }),
    createRangeItem('Previous Quarter', 'PreviewStringId.DateRangeParameterEditor_PreviousQuarter', function () { return [
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3 - 3).date,
        CSDateTime.today.addMonths(-CSDateTime.today.month % 3).date,
    ]; }),
    createRangeItem('Current Year', 'PreviewStringId.DateRangeParameterEditor_CurrentYear', function () { return [
        new Date(CSDateTime.today.year, 0, 1),
        new Date(CSDateTime.today.year, 11, 31),
    ]; }),
    createRangeItem('Last Year', 'PreviewStringId.DateRangeParameterEditor_LastYear', function () { return [
        CSDateTime.today.addYears(-1).date,
        CSDateTime.today.date
    ]; }),
    createRangeItem('Previous Year', 'PreviewStringId.DateRangeParameterEditor_PreviousYear', function () { return [
        new Date(CSDateTime.today.year - 1, 0, 1),
        new Date(CSDateTime.today.year - 1, 11, 31),
    ]; })
];
var DateRangeEditor = (function (_super) {
    __extends(DateRangeEditor, _super);
    function DateRangeEditor(_options) {
        var _this = _super.call(this) || this;
        _this._options = _options;
        _this._locker = new _locker_1.Locker();
        _this._popupVisible = ko.observable(false);
        _this._showPopup = function () {
            _this._popupVisible(true);
        };
        _this._hidePopup = function () {
            _this._popupVisible(false);
            _this._$element.get(0).querySelector('input').focus();
        };
        _this._accessibilityDialogItems = ko.observableArray([]);
        _this.popupTemplate = 'dxrv-daterange-editor-popup';
        _this.items = [];
        _this.startDate = ko.observable(new Date(new Date().setHours(0, 0, 0, 0)));
        _this.endDate = ko.observable(new Date(new Date().setHours(0, 0, 0, 0)));
        _this._disposables.push(_options.value.subscribe(function (newVal) { return _this.applyDate(newVal); }), _this._displayText = ko.computed(function () { return _this._getStringValue([_this.startDate(), _this.endDate()]); }), _this.startDate.subscribe(function () { return _this.applyValue(_this.startDate() > _this.endDate()); }), _this.endDate.subscribe(function () { return _this.applyValue(); }));
        _this.applyDate(_this._options.value());
        _this.items = exports.predefinedDateRanges;
        if (_options.isMobile) {
            _this.popupTemplate = 'dxrd-menu-parameters-content';
            _this.popupModel = new _parametersPopup_1.DateRangeParemeterPopupModel(_this);
        }
        else {
            _this.popupModel = _this;
        }
        _this.dialogKeyboardHelper = new _dateRangeKeyboardHelper_1.DateRangeDialogElementsKeyboardHelper(_this._hidePopup, _this._popupVisible);
        _this._disposables.push(_this.dialogKeyboardHelper);
        return _this;
    }
    DateRangeEditor.prototype._getStringValue = function (range) {
        return range.map(function (x) { return analytics_internal_1.formatDate(x); }).join(' - ');
    };
    DateRangeEditor.prototype._isSelected = function (item) {
        return this._displayText() === this._getStringValue(item.range());
    };
    DateRangeEditor.prototype._toParameterValue = function () {
        return [this.startDate(), this.endDate()];
    };
    DateRangeEditor.prototype._createTemplateData = function (value, min) {
        var _this = this;
        return {
            value: value,
            min: min,
            inRange: function (date) { return _this.inRange(date); }
        };
    };
    DateRangeEditor.prototype.applyDate = function (range, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        this._locker.lock(function () {
            if (range[1] < _this.startDate()) {
                _this.startDate(range[0]);
                _this.endDate(range[1]);
            }
            else {
                _this.endDate(range[1]);
                _this.startDate(range[0]);
            }
        });
        if (force)
            this.applyValue();
    };
    DateRangeEditor.prototype.inRange = function (date) {
        var _end = new Date(this.endDate().getTime());
        var _start = new Date(this.startDate().getTime());
        return date <= new Date(_end.setHours(0, 0, 0, 0)) &&
            date >= new Date(_start.setHours(0, 0, 0, 0));
    };
    DateRangeEditor.prototype.applyValue = function (updateEndDate) {
        var _this = this;
        if (updateEndDate === void 0) { updateEndDate = false; }
        this._locker.lock(function () {
            updateEndDate && _this.endDate(_this.startDate());
            _this._options.value(_this._toParameterValue());
        });
    };
    return DateRangeEditor;
}(analytics_utils_1.Disposable));
exports.DateRangeEditor = DateRangeEditor;
ko.bindingHandlers['dxrvDateRangeEditor'] = {
    init: function (element, valueAccessor, bindings, model, bindingContext) {
        var rangeEditor = new DateRangeEditor(valueAccessor());
        $(element).children().remove();
        var templateHtml = analytics_widgets_1.getTemplate('dxrv-daterange-editor'), $element = $(element).append(templateHtml);
        var context = bindingContext.createChildContext(rangeEditor);
        ko.applyBindingsToDescendants(context, $element.children()[0]);
        analytics_internal_1.addDisposeCallback(element, function () { return rangeEditor.dispose(); });
        return { controlsDescendantBindings: true };
    }
};
