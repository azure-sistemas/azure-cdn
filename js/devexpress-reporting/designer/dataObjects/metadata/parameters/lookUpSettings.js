﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\lookUpSettings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../../../controls/metadata/properties/metadata");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var editorTemplates_1 = require("../../../widgets/editorTemplates");
exports.dynamicListLookUpSettingsInfoBase = [
    metadata_1.dataAdapter, metadata_1.dataSource, metadata_1.dataMember,
    { propertyName: 'valueMember', modelName: '@ValueMember', displayName: 'Value Member', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.ValueMember', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('field') },
    { propertyName: 'displayMember', modelName: '@DisplayMember', displayName: 'Display Member', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.DisplayMember', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('field') },
    { propertyName: 'sortMember', modelName: '@SortMember', displayName: 'Sort Member', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.SortMember', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('field') },
    metadata_1.sortOrder
];
var staticListLookUpSettingsInfo = {
    propertyName: 'lookUpValues',
    displayName: 'Values',
    localizationId: 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings.LookUpValues',
    modelName: 'LookUpValues',
    array: true
};
exports.editedStaticListLookUpSettingsInfo = __assign({}, staticListLookUpSettingsInfo, { editor: { custom: 'dxrd-lookUpValues-editing' } });
exports.readonlyStaticListLookUpSettingsInfo = __assign({}, staticListLookUpSettingsInfo, { editor: editorTemplates_1.designerEditorTemplates.getEditor('lookUpValues') });
