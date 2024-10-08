﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\rangeSettings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parameter_1 = require("./parameter");
var parameterExpressionBinding_1 = require("./parameterExpressionBinding");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.rangeEditor = {
    custom: 'dxrd-parameters-range-grid', editorType: analytics_widgets_1.PropertyGridEditorFlat
};
exports.rangeBoundaryParameterInfos = [
    parameter_1.parameterNameSerializationInfo, parameter_1.parameterValueSerializationInfo,
    parameterExpressionBinding_1.parameterExpressionBindings, parameter_1.parameterExpressionSerializationInfo,
];
var startParameter = {
    propertyName: 'startParameter', modelName: '@StartParameter', displayName: 'Start Parameter', localizationId: 'DevExpress.XtraReports.Parameters.RangeSettings.StartParameter',
    editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), link: true
};
var endParameter = {
    propertyName: 'endParameter', modelName: '@EndParameter', displayName: 'End Parameter', localizationId: 'DevExpress.XtraReports.Parameters.RangeSettings.EndParameter',
    editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), link: true
};
exports.rangeSettingsInfos = [startParameter, endParameter];
