﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_summaryOptions.js)
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
var _summaryOptionsMetaData_1 = require("./_summaryOptionsMetaData");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var SummaryOptionsModelBase = (function () {
    function SummaryOptionsModelBase(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model || {});
    }
    SummaryOptionsModelBase.prototype.getInfo = function () {
        return _summaryOptionsMetaData_1.summaryOptionsSerializationInfoArray;
    };
    SummaryOptionsModelBase.prototype.resetAllProperties = function () {
        var _this = this;
        this.getInfo().forEach(function (info) {
            if ('defaultVal' in info) {
                _this[info.propertyName](info.defaultVal);
            }
            else if (info.propertyName === 'summaryFunction') {
                _this.summaryFunction.functionName(null);
                _this.summaryFunction.args([]);
            }
            else {
                _this[info.propertyName](null);
            }
        });
    };
    return SummaryOptionsModelBase;
}());
exports.SummaryOptionsModelBase = SummaryOptionsModelBase;
var QualitativeSummaryOptionsModel = (function (_super) {
    __extends(QualitativeSummaryOptionsModel, _super);
    function QualitativeSummaryOptionsModel(model, serializer) {
        return _super.call(this, model || {}, serializer) || this;
    }
    QualitativeSummaryOptionsModel.from = function (model, serializer) {
        return new QualitativeSummaryOptionsModel(model || {}, serializer);
    };
    QualitativeSummaryOptionsModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _summaryOptionsMetaData_1.summaryOptionsSerializationInfoArray, refs);
    };
    return QualitativeSummaryOptionsModel;
}(SummaryOptionsModelBase));
exports.QualitativeSummaryOptionsModel = QualitativeSummaryOptionsModel;
var NumericSummaryOptionsModel = (function (_super) {
    __extends(NumericSummaryOptionsModel, _super);
    function NumericSummaryOptionsModel(model, serializer) {
        return _super.call(this, model || {}, serializer) || this;
    }
    NumericSummaryOptionsModel.from = function (model, serializer) {
        return new NumericSummaryOptionsModel(model || {}, serializer);
    };
    NumericSummaryOptionsModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _summaryOptionsMetaData_1.numericSummaryOptionsSerializationInfoArray, refs);
    };
    NumericSummaryOptionsModel.prototype.getInfo = function () {
        return _summaryOptionsMetaData_1.numericSummaryOptionsSerializationInfoArray;
    };
    return NumericSummaryOptionsModel;
}(SummaryOptionsModelBase));
exports.NumericSummaryOptionsModel = NumericSummaryOptionsModel;
var DateTimeSummaryOptionsModel = (function (_super) {
    __extends(DateTimeSummaryOptionsModel, _super);
    function DateTimeSummaryOptionsModel(model, serializer) {
        return _super.call(this, model || {}, serializer) || this;
    }
    DateTimeSummaryOptionsModel.from = function (model, serializer) {
        return new DateTimeSummaryOptionsModel(model || {}, serializer);
    };
    DateTimeSummaryOptionsModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _summaryOptionsMetaData_1.dateTimeSummaryOptionsSerializationInfoArray, refs);
    };
    DateTimeSummaryOptionsModel.prototype.getInfo = function () {
        return _summaryOptionsMetaData_1.dateTimeSummaryOptionsSerializationInfoArray;
    };
    return DateTimeSummaryOptionsModel;
}(SummaryOptionsModelBase));
exports.DateTimeSummaryOptionsModel = DateTimeSummaryOptionsModel;
