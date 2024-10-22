﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataFilter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _editorTemplates_1 = require("../../internal/_editorTemplates");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.dataFilterSerializationsInfo = [
    { propertyName: 'columnName', displayName: 'Column Name', editor: ko.bindingHandlers['displayNameExtender'] ? analytics_widgets_1.editorTemplates.getEditor('field') : _editorTemplates_1.editorTemplates.getEditor('fieldChart'), modelName: '@ColumnNameSerializable', localizationId: 'DevExpress.XtraCharts.DataFilter.ColumnName' },
    {
        propertyName: 'dataType', displayName: 'Data Type', defaultVal: 'System.String', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), modelName: '@DataTypeSerializable',
        valuesArray: [{ value: 'System.Boolean', displayValue: 'System.Boolean' }, { value: 'System.Byte', displayValue: 'System.Byte' }, { value: 'System.Char', displayValue: 'System.Char' }, { value: 'System.DateTime', displayValue: 'System.DateTime' }, { value: 'System.Decimal', displayValue: 'System.Decimal' }, { value: 'System.Double', displayValue: 'System.Double' }, { value: 'System.Guid', displayValue: 'System.Guid' }, { value: 'System.Int16', displayValue: 'System.Int16' }, { value: 'System.Int32', displayValue: 'System.Int32' }, { value: 'System.Int64', displayValue: 'System.Int64' }, { value: 'System.SByte', displayValue: 'System.SByte' }, { value: 'System.Single', displayValue: 'System.Single' }, { value: 'System.String', displayValue: 'System.String' }, { value: 'System.TimeSpan', displayValue: 'System.TimeSpan' }, { value: 'System.UInt16', displayValue: 'System.UInt16' }, { value: 'System.UInt32', displayValue: 'System.UInt32' }, { value: 'System.UInt64', displayValue: 'System.UInt64' }],
        localizationId: 'DevExpress.XtraCharts.DataFilter.DataType'
    },
    {
        propertyName: 'condition', displayName: 'Condition', defaultVal: 'Equal', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), modelName: '@Condition',
        valuesArray: [{ value: 'Equal', displayValue: 'Equal', localizationId: 'DevExpress.XtraCharts.DataFilterCondition.Equal' }, { value: 'GreaterThan', displayValue: 'GreaterThan' }, { value: 'GreaterThanOrEqual', displayValue: 'GreaterThanOrEqual' }, { value: 'LessThan', displayValue: 'LessThan' }, { value: 'LessThanOrEqual', displayValue: 'LessThanOrEqual' }, { value: 'NotEqual', displayValue: 'NotEqual' }],
        localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Condition'
    },
    { propertyName: 'value', displayName: 'Value', editor: analytics_widgets_1.editorTemplates.getEditor('text'), modelName: '@InvariantValueSerializable', localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' }
];
var DataFilterModel = (function () {
    function DataFilterModel(model, serializer) {
        var _this = this;
        this.columnName = ko.observable('');
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
        this.name = ko.pureComputed(function () {
            return !!_this.columnName() ? _this.columnName() : analytics_internal_1.getLocalization('DataFilter', 'ChartStringId.DefaultDataFilterName');
        });
    }
    DataFilterModel.createNew = function () {
        return new (exports.DefaultDataFilterModel())({}, new analytics_utils_1.ModelSerializer());
    };
    DataFilterModel.prototype.getInfo = function () {
        return exports.dataFilterSerializationsInfo;
    };
    return DataFilterModel;
}());
exports.DataFilterModel = DataFilterModel;
exports.DefaultDataFilterModel = analytics_internal_1.createGlobalModuleVariableFunc(DataFilterModel);
