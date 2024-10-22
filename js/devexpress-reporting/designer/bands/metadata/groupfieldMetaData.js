﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\groupfieldMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groupfield_1 = require("../groupfield");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.groupFields = {
    propertyName: 'groupFields',
    modelName: 'GroupFields', displayName: 'Group Fields', localizationId: 'DevExpress.XtraReports.UI.GroupHeaderBand.GroupFields', array: true, editor: analytics_widgets_1.editorTemplates.getEditor('commonCollection'),
    addHandler: groupfield_1.GroupFieldModel.createNew, template: '#dxrd-collection-item-group',
    getChildCaption: function (index) {
        if (index === 0)
            return analytics_utils_1.getLocalization('Group By', 'DataAccessUIStringId.QueryBuilderColumns_GroupBy');
        return analytics_utils_1.getLocalization('Then By', 'ASPxReportsStringId.ReportDesigner_SortFields_ThenBy');
    }
};
exports.sortFields = {
    propertyName: 'sortFields',
    modelName: 'SortFields', displayName: 'Sort Fields', localizationId: 'DevExpress.XtraReports.UI.DetailBand.SortFields', array: true, editor: analytics_widgets_1.editorTemplates.getEditor('commonCollection'),
    addHandler: groupfield_1.GroupFieldModel.createNew, template: '#dxrd-collection-item-group',
    getChildCaption: function (index) {
        if (index === 0)
            return analytics_utils_1.getLocalization('Sort By', 'ASPxReportsStringId.ReportDesigner_SortFields_SortBy');
        return analytics_utils_1.getLocalization('Then By', 'ASPxReportsStringId.ReportDesigner_SortFields_ThenBy');
    }
};
exports.groupFieldSerializationInfo = [
    { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.GroupField.FieldName', editor: editorTemplates_1.designerEditorTemplates.getEditor('dataBinding') },
    { propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'Sort Order', localizationId: 'DevExpress.XtraReports.UI.GroupField.SortOrder', defaultVal: 'Ascending' }
];
