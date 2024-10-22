﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_addVariablesToExpressionEditor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
function addVariablesToExpressionEditor(categories, customizeItems) {
    if (customizeItems === void 0) { customizeItems = function (items) { return items; }; }
    var items = customizeItems([
        { text: 'DataSource.CurrentRowIndex', class: 'dx-expression-variables-datasource', val: '[DataSource.CurrentRowIndex]', descriptionStringId: 'ReportStringId.ExpressionEditor_ItemInfo_Variables_CurrentRowIndex_Description' },
        { text: 'DataSource.RowCount', class: 'dx-expression-variables-datasource', val: '[DataSource.RowCount]', descriptionStringId: 'ReportStringId.ExpressionEditor_ItemInfo_Variables_RowCount_Description' },
        { text: 'DataSource.CurrentRowHierarchyLevel', class: 'dx-expression-variables-datasource', val: '[DataSource.CurrentRowHierarchyLevel]', descriptionStringId: 'ReportStringId.ExpressionEditor_ItemInfo_Variables_CurrentRowHierarchyLevel_Description' },
        { text: 'Arguments.GroupRowIndex', class: 'dx-expression-variables-arguments', val: '[Arguments.GroupRowIndex]', descriptionStringId: '' },
        { text: 'Arguments.GroupColumnIndex', class: 'dx-expression-variables-arguments', val: '[Arguments.GroupColumnIndex]', descriptionStringId: '' }
    ]);
    categories.push(analytics_widgets_internal_1.createExpressionEditorCollectionToolOptions(items, 'Variables', 'ReportStringId.ExpressionEditor_ItemInfo_Variables', true));
}
exports.addVariablesToExpressionEditor = addVariablesToExpressionEditor;
