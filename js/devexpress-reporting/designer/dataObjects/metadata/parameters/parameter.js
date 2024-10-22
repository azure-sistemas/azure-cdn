﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\parameter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var parameterExpressionBinding_1 = require("./parameterExpressionBinding");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var editorTemplates_1 = require("../../../widgets/editorTemplates");
var parameterSettings_1 = require("../../parameters/parameterSettings");
var _parameterUtils_1 = require("../_parameterUtils");
exports.valueSourceSettingsTypes = [
    { value: 'None', displayValue: '(none)', localizationId: 'PreviewStringId.ParameterLookUpSettingsNoLookUp' },
    { value: 'StaticListLookUpSettings', displayValue: 'Static List', localizationId: 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings' },
    { value: 'DynamicListLookUpSettings', displayValue: 'Dynamic List', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings' }
];
exports.extendValueSourceSettingsTypes = analytics_internal_1.extend(true, [], [].concat(exports.valueSourceSettingsTypes, [
    { value: 'RangeParametersSettings', displayValue: 'Range Parameters', localizationId: 'DevExpress.XtraReports.Parameters.RangeParametersSettings' }
]));
exports.parameterValueSerializationInfo = { propertyName: 'value', displayName: 'Value', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Value', modelName: '@ValueInfo', from: function (val) { return ko.observable(val); }, toJsonObject: _parameterUtils_1.parameterValueToJsonObject };
exports.parameterExpressionSerializationInfo = { propertyName: 'ValueExpressionObj', displayName: 'Expression', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Expression', editor: analytics_widgets_1.editorTemplates.getEditor('expressionEditor') };
exports.parameterLookUpSettingsSerializationInfo = { propertyName: 'lookUpSettings', displayName: 'Look-Up Settings', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.LookUpSettings', modelName: '@LookUpSettings', link: true, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.valueSourceSettingsSerializationInfo = { propertyName: 'valueSourceSettings', displayName: 'Value Source Settings', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.ValueSourceSettings', modelName: '@ValueSourceSettings', link: true, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.parameterNameSerializationInfo = { propertyName: 'parameterName', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraReports.UI.XRControl.Name', defaultVal: '', validationRules: analytics_internal_1.nameValidationRules, editor: editorTemplates_1.designerEditorTemplates.getEditor('name') };
exports.parameterSerializationInfo = [
    exports.parameterNameSerializationInfo,
    { propertyName: 'description', localizable: true, modelName: '@Description', displayName: 'Description', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Description', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'type', displayName: 'Type', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Type', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: (parameterSettings_1.parameterTypeValues) },
    { propertyName: 'visible', modelName: '@Visible', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('boolSelect'), displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible' },
    { propertyName: 'enabled', modelName: '@Enabled', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('boolSelect'), displayName: 'Enabled', localizationId: 'DevExpress.XtraReports.UI.EditOptions.Enabled' },
    { propertyName: 'allowNull', modelName: '@AllowNull', displayName: 'Allow Null', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.AllowNull', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
    { propertyName: 'isMultiValue', modelName: '@MultiValue', displayName: 'MultiValue', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.MultiValue', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
    { propertyName: 'selectAllValues', modelName: '@SelectAllValues', displayName: 'Select All Values', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.SelectAllValues', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
    { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '' },
    exports.parameterExpressionSerializationInfo,
    exports.parameterValueSerializationInfo,
    parameterExpressionBinding_1.parameterExpressionBindings,
    { propertyName: '_obsoleteValue', modelName: '@Value', link: true },
    { propertyName: '_type', modelName: '@Type', link: true },
    {
        propertyName: 'valueSourceSettingsType', displayName: 'Value Source Settings', localizationId: 'DevExpress.XtraReports.Parameters.Parameter.ValueSourceSettings', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: exports.valueSourceSettingsTypes
    },
    exports.valueSourceSettingsSerializationInfo
];
