﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\formattingrules.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var formattingrules_1 = require("../../properties/formattingrules");
var metadata_1 = require("./metadata");
var metadata_2 = require("../../../../common/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var editorTemplates_1 = require("../../../widgets/editorTemplates");
exports.formattingRuleLinkSerializationsInfo = [
    { propertyName: 'value', modelName: '@Value', link: true }
];
exports.formattingRuleLinks = {
    propertyName: 'formattingRuleLinks', modelName: 'FormattingRuleLinks', displayName: 'Formatting Rules', localizationId: 'DevExpress.XtraReports.UI.XRControl.FormattingRules', array: true,
    editor: editorTemplates_1.designerEditorTemplates.getEditor('formattingRule'), addHandler: formattingrules_1.FormattingRule.createNew,
    displayPropertyName: 'name'
};
exports.defaultBooleanVisible = {
    propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.Formatting.Visible', defaultVal: 'Default', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: metadata_1.defaultBooleanValuesArray
};
var borderWidthSerializable = { propertyName: 'borderWidthSerializable', modelName: '@BorderWidthSerializable', displayName: 'Border Width', localizationId: 'DevExpress.XtraReports.UI.Formatting.BorderWidthSerializable', from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, sides = analytics_internal_1.extend({ displayName: 'Borders', editor: analytics_widgets_1.editorTemplates.getEditor('borders'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders' }, metadata_2.previewSides);
exports.formattingSerializationsInfo = [metadata_1.backColor, sides, metadata_1.borderColor, metadata_1.borderDashStyle, borderWidthSerializable,
    metadata_1.foreColor, metadata_1.font, metadata_1.textAlignment, exports.defaultBooleanVisible
].concat(metadata_1.paddingGroup);
exports.conditionObj = { propertyName: 'conditionObj', displayName: 'Condition', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Condition', editor: analytics_widgets_1.editorTemplates.getEditor('expressionEditor') };
exports.formatting = { propertyName: 'formatting', modelName: 'Formatting', displayName: 'Formatting', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Formatting', info: exports.formattingSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.formattingRuleSerializationsInfo = [
    { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Name', editor: analytics_widgets_1.editorTemplates.getEditor('text'), validationRules: analytics_internal_1.nameValidationRules },
    { propertyName: 'condition', modelName: '@Condition', displayName: 'Condition', localizationId: 'DevExpress.XtraReports.UI.FormattingRule.Condition', defaultVal: '' },
    exports.conditionObj,
    metadata_1.dataSource, metadata_1.dataMember,
    exports.formatting
];
