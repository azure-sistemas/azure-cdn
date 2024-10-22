﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_point.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var $ = require("jquery");
var SeriesPointModel = (function (_super) {
    __extends(SeriesPointModel, _super);
    function SeriesPointModel(model, series, serializer) {
        var _this = _super.call(this, model, serializer, _chart_1.seriesPointSerializationsInfo) || this;
        _this.series = series;
        _this.arrayValueDataMemberNames = series.valueDataMembers().arrayValueDataMemberNames;
        _this._assignValueDataMembers(_this, _this.valuesSerializable(), null);
        _this._disposables.push(_this.series.valueDataMembers.subscribe(function (newValue) { _this.arrayValueDataMemberNames = newValue.arrayValueDataMemberNames; }));
        _this._disposables.push(_this.series.valueScaleType.subscribe(function (newValue) {
            _this._assignValueDataMembers(_this, null, null);
        }));
        _this.valuesSerializable = ko.computed(function () {
            return _this.arrayValueDataMemberNames.map(function (name) { return _this[name]; });
        });
        _this.argumentSerializableInfo = ko.computed(function () {
            var argumentScaleType = series.argumentScaleType();
            var editor = analytics_widgets_1.editorTemplates.getEditor('text');
            if (argumentScaleType === 'Numerical') {
                editor = analytics_widgets_1.editorTemplates.getEditor('numeric');
            }
            else if (argumentScaleType === 'DateTime') {
                editor = analytics_widgets_1.editorTemplates.getEditor('date');
            }
            return $.extend(true, {}, _chart_1.argumentSerializable, { editor: editor });
        });
        _this.getInfo = function () {
            var dataMember = _this.series && _this.series.valueDataMembers();
            if (!dataMember)
                return _chart_1.seriesPointSerializationsInfo;
            var valueDataMemberInfo = dataMember.getInfo().map(function (info) { return $.extend({}, info, { editor: _this.isDateType ? analytics_widgets_1.editorTemplates.getEditor('date') : analytics_widgets_1.editorTemplates.getEditor('numeric') }); });
            var info = $.extend(true, [], _chart_1.seriesPointSerializationsInfo);
            info.splice(info.indexOf(info.filter(function (prop) { return prop.propertyName === 'argumentSerializable'; })[0]), 1, _this.argumentSerializableInfo());
            return info.concat(valueDataMemberInfo);
        };
        return _this;
    }
    SeriesPointModel.getSerializationValue = function (array, dateConverter) {
        return array.map(function (item) {
            var value = ko.unwrap(item);
            return (value instanceof Date) ? dateConverter(value) : value;
        });
    };
    SeriesPointModel.createNew = function (series) {
        return new SeriesPointModel(SeriesPointModel.getPointModelBySeries(series), series, new analytics_utils_1.ModelSerializer());
    };
    SeriesPointModel.getPointModelBySeries = function (series) {
        var value = SeriesPointModel.getDefaultValueByScaleType(series.valueScaleType());
        value = (value instanceof Date) ? analytics_internal_1.formatDate(value) : value.toString();
        for (var ind = 1; ind < series.valueDataMembers().arrayValueDataMemberNames.length; ind++) {
            value += (SeriesPointModel.separator + value);
        }
        var newModel = {
            '@ValuesSerializable': value
        };
        var argument = SeriesPointModel.getDefaultValueByScaleType(series.argumentScaleType());
        if (argument !== null && argument !== void 0) {
            newModel['@ArgumentSerializable'] = argument;
        }
        return newModel;
    };
    SeriesPointModel.getDefaultValueByScaleType = function (scaleType) {
        if (scaleType === 'Numerical') {
            return 0;
        }
        else if (scaleType === 'DateTime') {
            return new Date(new Date().setHours(0, 0, 0, 0));
        }
        return null;
    };
    SeriesPointModel.valueToJsonObject = function (value) {
        var result = SeriesPointModel.getSerializationValue(value, _dateUtils_1.serializeDate);
        return (result instanceof Array) ? result.join(SeriesPointModel.separator) : result;
    };
    SeriesPointModel.prototype._valueDataMembersToString = function (valueDataMember, isDateType) {
        var result = [];
        valueDataMember.arrayValueDataMemberNames.forEach(function (name) {
            if (isDateType)
                result.push(_dateUtils_1.serializeDate(valueDataMember[name]() || ''));
            result.push(valueDataMember[name]() || '');
        });
        return result.join(SeriesPointModel.separator);
    };
    SeriesPointModel.prototype._assignValueDataMembers = function (valueDataMember, value, defaultValue) {
        var _this = this;
        var values = (value || '').split(SeriesPointModel.separator);
        valueDataMember.arrayValueDataMemberNames.forEach(function (name, index) {
            var newValue;
            if (_this.isDateType && values[index]) {
                newValue = analytics_internal_1.parseDate(values[index] || defaultValue, false, 'MM/dd/yyyy');
                if (!newValue)
                    newValue = _dateUtils_1.parseDate(values[index] || defaultValue);
            }
            else {
                newValue = (values[index] || defaultValue);
            }
            if (valueDataMember[name])
                valueDataMember[name](newValue);
            else
                valueDataMember[name] = ko.observable(newValue);
        });
    };
    Object.defineProperty(SeriesPointModel.prototype, "isDateType", {
        get: function () {
            return this.series.valueScaleType() === 'DateTime';
        },
        enumerable: true,
        configurable: true
    });
    SeriesPointModel.separator = ';';
    return SeriesPointModel;
}(analytics_elements_1.SerializableModel));
exports.SeriesPointModel = SeriesPointModel;
var _chart_1 = require("../../internal/meta/_chart");
var _dateUtils_1 = require("../../_dateUtils");
