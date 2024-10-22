﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCharactercomb.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("./properties/metadata");
var style_1 = require("./properties/style");
var formattingrules_1 = require("./properties/formattingrules");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var editOptions_1 = require("./properties/editOptions");
var sortingOptions_1 = require("./properties/sortingOptions");
var _metaUtils_1 = require("../utils/_metaUtils");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.cellVerticalSpacing = { propertyName: 'verticalSpacing', localizable: true, modelName: '@CellVerticalSpacing', defaultVal: 0, displayName: 'Cell Vertical Spacing', localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellVerticalSpacing', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.cellHorizontalSpacing = { propertyName: 'horizontalSpacing', localizable: true, modelName: '@CellHorizontalSpacing', defaultVal: 0, displayName: 'Cell Horizontal Spacing', localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellHorizontalSpacing', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.cellWidth = {
    propertyName: 'cellWidth', modelName: '@CellWidth', defaultVal: 25, displayName: 'Cell Width', localizable: true, localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellWidth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), editorOptions: { placeholder: ko.observable(analytics_utils_1.getLocalization('(Auto)', 'ASPxReportsStringId.ReportDesigner_PropertyGrid_AutoValueString')) }
};
exports.cellHeight = {
    propertyName: 'cellHeight', modelName: '@CellHeight', defaultVal: 25, displayName: 'Cell Height', localizable: true, localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellHeight', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), editorOptions: { placeholder: ko.observable(analytics_utils_1.getLocalization('(Auto)', 'ASPxReportsStringId.ReportDesigner_PropertyGrid_AutoValueString')) }
};
exports.cellSizeMode = {
    propertyName: 'sizeMode', modelName: '@CellSizeMode', displayName: 'Cell Size Mode', localizationId: 'DevExpress.XtraReports.UI.XRCharacterComb.CellSizeMode', defaultVal: 'AutoSize', editor: editorTemplates_1.designerEditorTemplates.getEditor('comboboxUndo'),
    valuesArray: [
        { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.XtraPrinting.SizeMode.Custom' },
        { value: 'AutoWidth', displayValue: 'Auto Width', localizationId: 'DevExpress.XtraPrinting.SizeMode.AutoWidth' },
        { value: 'AutoHeight', displayValue: 'Auto Height', localizationId: 'DevExpress.XtraPrinting.SizeMode.AutoHeight' },
        { value: 'AutoSize', displayValue: 'Auto Size', localizationId: 'DevExpress.XtraPrinting.SizeMode.AutoSize' }
    ]
};
var wordWrap = { propertyName: 'wordWrap', modelName: '@WordWrap', defaultVal: true, from: analytics_utils_1.parseBool, displayName: 'Word Wrap', localizationId: 'DevExpress.XtraReports.UI.XRControl.WordWrap', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.characterCombFont = { propertyName: 'font', modelName: '@Font', displayName: 'Font', localizationId: 'DevExpress.XtraReports.UI.XRControl.Font', editor: editorTemplates_1.designerEditorTemplates.getEditor('fontUndo') };
exports.characterCombBorders = { propertyName: 'borders', modelName: '@Borders', displayName: 'Borders', localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders', defaultVal: 'All', editor: analytics_widgets_1.editorTemplates.getEditor('borders') };
exports.characterCombBorderDashStyle = $.extend({}, metadata_1.borderDashStyle, { valuesArray: metadata_1.borderDashStyleValues });
exports.characterCombSerializationsInfo = [
    style_1.styleName, style_1.evenStyleName, style_1.oddStyleName, style_1.stylePriority, metadata_1.canPublish, metadata_1.backColor, metadata_1.autoWidth,
    formattingrules_1.formattingRuleLinks, exports.cellSizeMode, wordWrap, exports.cellWidth, exports.cellHeight, exports.cellVerticalSpacing, exports.cellHorizontalSpacing, dataBinding_1.dataBindings(['Text']),
    metadata_1.textAlignment, metadata_1.text, metadata_1.textFormatString, metadata_1.textArea, metadata_1.nullValueText, metadata_1.keepTogetherDefaultValueFalse, metadata_1.summary, metadata_1.multiline, wordWrap,
    metadata_1.xlsxFormatString, metadata_1.rtl, exports.characterCombBorders, metadata_1.borderWidth, exports.characterCombBorderDashStyle, metadata_1.borderColor, exports.characterCombFont, metadata_1.foreColor, editOptions_1.editOptions, sortingOptions_1.interactiveSorting
].concat(_metaUtils_1.createSinglePopularBindingInfos('Text'), metadataGroups_1.baseControlProperties, metadataGroups_1.navigationGroup, metadataGroups_1.canGrowShrinkGroup, metadataGroups_1.processGroup, metadataGroups_1.sizeLocation);
