﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\sortingOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var editorTemplates_1 = require("../../../widgets/editorTemplates");
var sortingFieldName = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.SortingOptions.FieldName', defaultVal: '', editor: editorTemplates_1.designerEditorTemplates.getEditor('fieldsCombobox') }, targetBand = { propertyName: 'targetBand', modelName: '@TargetBand', link: true, displayName: 'Target Band', localizationId: 'DevExpress.XtraReports.UI.SortingOptions.TargetBand', editor: editorTemplates_1.designerEditorTemplates.getEditor('sortingBand') };
exports.sortingOptionsSerializationsInfo = [targetBand, sortingFieldName];
exports.interactiveSorting = { propertyName: 'interactiveSorting', modelName: 'InteractiveSorting', displayName: 'Interactive Sorting', localizationId: 'DevExpress.XtraReports.UI.XRLabel.InteractiveSorting', info: exports.sortingOptionsSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
