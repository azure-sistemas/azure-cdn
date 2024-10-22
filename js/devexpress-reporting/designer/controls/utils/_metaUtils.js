﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_metaUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editorTemplates_1 = require("../../widgets/editorTemplates");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.createSinglePopularBindingInfos = function (propertyName) {
    return [exports.createPopularBindingInfo({ bindingName: propertyName, propertyName: '' }, false), exports.createPopularBindingInfo({ bindingName: propertyName, propertyName: '' })];
};
exports.createPopularBindingInfos = function (options) {
    var dataBindingOptions = {
        propertyName: 'popularDataBinding' + options.propertyName,
        displayName: options.propertyName,
        localizationId: options.localizationId,
        bindingName: options.propertyName,
    };
    var expressionOptions = {
        propertyName: 'popularExpression' + options.propertyName,
        displayName: options.propertyName,
        localizationId: options.localizationId,
        bindingName: options.propertyName,
    };
    return [exports.createPopularBindingInfo(dataBindingOptions, false), exports.createPopularBindingInfo(expressionOptions)];
};
exports.createPopularBindingInfo = function (options, isExpression) {
    if (isExpression === void 0) { isExpression = true; }
    var newInfo = {
        propertyName: options.propertyName || (isExpression ? 'popularExpression' : 'popularDataBinding'),
        displayName: options.displayName || (isExpression ? 'Expression' : 'Data Binding'),
        localizationId: options.localizationId || (isExpression ? 'DevExpress.XtraReports.UI.CalculatedField.Expression' : 'ReportStringId.STag_Name_DataBinding'),
        editor: isExpression ? editorTemplates_1.designerEditorTemplates.getEditor('reportexpressionComplex') : editorTemplates_1.designerEditorTemplates.getEditor('dataBinding'),
    };
    if (isExpression)
        newInfo['expressionName'] = options.bindingName;
    else
        newInfo['bindingName'] = options.bindingName;
    return newInfo;
};
function valuesArrayAsEnumWithLocalizationId(info, prefix) {
    return info.valuesArray.map(function (item) {
        var subName = item.localizationId && item.localizationId.split('.').pop() || item.value;
        return analytics_internal_1.extend({}, item, { localizationId: prefix + subName });
    });
}
exports.valuesArrayAsEnumWithLocalizationId = valuesArrayAsEnumWithLocalizationId;
