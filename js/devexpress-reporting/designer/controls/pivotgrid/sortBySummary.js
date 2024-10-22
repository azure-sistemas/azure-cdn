﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\sortBySummary.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sortBySummary_1 = require("../metadata/pivotgrid/sortBySummary");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var SortBySummaryInfoCondition = (function () {
    function SortBySummaryInfoCondition(model, fieldsProvider, serializer) {
        this._fieldsProvider = fieldsProvider;
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    SortBySummaryInfoCondition.prototype.getInfo = function () {
        var fields = this._fieldsProvider.fieldsAvailableForCondition();
        if (fields.length < 1) {
            return sortBySummary_1.sortBySummaryConditionInfo;
        }
        var conditionInfoClone = sortBySummary_1.sortBySummaryConditionInfo.slice(0), fieldComponentName = analytics_internal_1.find(sortBySummary_1.sortBySummaryConditionInfo, function (item) { return item.modelName === '@FieldComponentName'; }), fieldComponentNameClone = $.extend(true, {}, fieldComponentName);
        fields.forEach(function (fieldName) { fieldComponentNameClone.valuesArray.push({ value: fieldName, displayValue: fieldName }); });
        conditionInfoClone.splice(conditionInfoClone.indexOf(fieldComponentName), 1, fieldComponentNameClone);
        return conditionInfoClone;
    };
    SortBySummaryInfoCondition.createNew = function (parent, serializer) {
        return new SortBySummaryInfoCondition({}, parent, serializer);
    };
    return SortBySummaryInfoCondition;
}());
exports.SortBySummaryInfoCondition = SortBySummaryInfoCondition;
var SortBySummaryInfo = (function () {
    function SortBySummaryInfo(model, field, serializer) {
        var _this = this;
        this._field = field;
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model, sortBySummary_1.sortBySummaryInfo);
        this.conditions = analytics_utils_1.deserializeArray(model['Conditions'] || {}, function (item) { return new SortBySummaryInfoCondition(item, _this, serializer); });
    }
    SortBySummaryInfo.prototype._pivotGridFields = function () {
        return this._field.parentModel().fields;
    };
    SortBySummaryInfo.prototype.getInfo = function () {
        var _this = this;
        var fields = this._pivotGridFields();
        if (!fields) {
            return sortBySummary_1.sortBySummaryInfo;
        }
        var sortBySummaryInfoClone = sortBySummary_1.sortBySummaryInfo.slice(0), fieldComponentName = analytics_internal_1.find(sortBySummary_1.sortBySummaryInfo, function (item) { return item.modelName === '@FieldComponentName'; }), fieldComponentNameClone = $.extend(true, {}, fieldComponentName);
        fields().forEach(function (field) {
            if (field.name() !== _this._field.name()) {
                fieldComponentNameClone.valuesArray.push({ value: field.name(), displayValue: field.name() });
            }
        });
        sortBySummaryInfoClone.splice(sortBySummary_1.sortBySummaryInfo.indexOf(fieldComponentName), 1, fieldComponentNameClone);
        return sortBySummaryInfoClone;
    };
    SortBySummaryInfo.prototype.fieldsAvailableForCondition = function () {
        var _this = this;
        var fields = this._pivotGridFields();
        if (!fields) {
            return [];
        }
        var result = [];
        fields().forEach(function (field) {
            var condition = analytics_internal_1.find(_this.conditions(), function (item) { return item.fieldComponentName() === field.name(); });
            if (!condition) {
                result.push(field.name());
            }
        });
        return result;
    };
    SortBySummaryInfo.from = function (model, serializer) {
        return model;
    };
    SortBySummaryInfo.toJSON = function (viewModel, serializer, refs) {
        return (serializer || new analytics_utils_1.ModelSerializer()).serialize(viewModel, sortBySummary_1.sortBySummaryInfo, refs);
    };
    return SortBySummaryInfo;
}());
exports.SortBySummaryInfo = SortBySummaryInfo;
