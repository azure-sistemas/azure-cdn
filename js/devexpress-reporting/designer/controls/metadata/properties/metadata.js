﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\metadata.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var linesEditor_1 = require("../../../widgets/linesEditor");
var metadata_1 = require("../../../../common/metadata");
var settings_1 = require("../../../utils/settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_metadata_1 = require("@devexpress/analytics-core/analytics-widgets-metadata");
var editorTemplates_1 = require("../../../widgets/editorTemplates");
exports.textAlignmentValues = [
    { value: 'TopLeft', displayValue: 'Top Left', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopLeft' },
    { value: 'MiddleLeft', displayValue: 'Middle Left', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleLeft' },
    { value: 'BottomLeft', displayValue: 'Bottom Left', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomLeft' },
    { value: 'TopCenter', displayValue: 'Top Center', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopCenter' },
    { value: 'MiddleCenter', displayValue: 'Middle Center', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleCenter' },
    { value: 'BottomCenter', displayValue: 'Bottom Center', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomCenter' },
    { value: 'TopJustify', displayValue: 'Top Justify', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopJustify' },
    { value: 'MiddleJustify', displayValue: 'Middle Justify', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleJustify' },
    { value: 'BottomJustify', displayValue: 'Bottom Justify', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomJustify' },
    { value: 'TopRight', displayValue: 'Top Right', localizationId: 'DevExpress.XtraPrinting.TextAlignment.TopRight' },
    { value: 'MiddleRight', displayValue: 'Middle Right', localizationId: 'DevExpress.XtraPrinting.TextAlignment.MiddleRight' },
    { value: 'BottomRight', displayValue: 'Bottom Right', localizationId: 'DevExpress.XtraPrinting.TextAlignment.BottomRight' },
];
exports.borderDashStyleValues = [
    { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Solid' },
    { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Dash' },
    { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Dot' },
    { value: 'DashDot', displayValue: 'Dash-Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.DashDot' },
    { value: 'DashDotDot', displayValue: 'Dash-Dot-Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.DashDotDot' }
];
exports.stylePrioritySerializationInfo = [
    { propertyName: 'useBackColor', modelName: '@UseBackColor', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useBorderColor', modelName: '@UseBorderColor', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useBorderDashStyle', modelName: '@UseBorderDashStyle', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useBorders', modelName: '@UseBorders', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useBorderWidth', modelName: '@UseBorderWidth', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useFont', modelName: '@UseFont', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useForeColor', modelName: '@UseForeColor', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'usePadding', modelName: '@UsePadding', defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'useTextAlignment', modelName: '@UseTextAlignment', defaultVal: true, from: analytics_utils_1.parseBool }
];
exports.xlsxFormatString = { propertyName: 'xlsxFormatString', modelName: '@XlsxFormatString', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text'), displayName: 'Xlsx Format String', localizationId: 'DevExpress.XtraReports.UI.XRControl.XlsxFormatString' };
exports.name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraReports.UI.XRControl.Name', editor: editorTemplates_1.designerEditorTemplates.getEditor('name'), validationRules: analytics_internal_1.nameValidationRules };
exports.displayName = { propertyName: 'displayNameObject', localizable: true, modelName: '@DisplayName', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '', displayName: 'Display Name', localizationId: 'DevExpress.XtraReports.UI.XtraReport.DisplayName' };
exports.text = { propertyName: 'text', modelName: '@Text', defaultVal: '', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizable: true };
exports.textArea = { propertyName: 'textArea', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', defaultVal: '', localizable: true, editor: analytics_internal_1.extend({}, analytics_widgets_1.editorTemplates.getEditor('stringArray'), { editorType: linesEditor_1.LinesEditor }) };
exports.textTrimming = {
    propertyName: 'textTrimming', modelName: '@TextTrimming', displayName: 'Text Trimming', localizationId: 'DevExpress.XtraReports.UI.XRControl.TextTrimming', defaultVal: 'Character', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'System.Drawing.StringTrimming.None' },
        { value: 'Character', displayValue: 'Character', localizationId: 'System.Drawing.StringTrimming.Character' },
        { value: 'Word', displayValue: 'Word', localizationId: 'System.Drawing.StringTrimming.Word' },
        { value: 'EllipsisCharacter', displayValue: 'Ellipsis Character', localizationId: 'System.Drawing.StringTrimming.EllipsisCharacter' },
        { value: 'EllipsisWord', displayValue: 'Ellipsis Word', localizationId: 'System.Drawing.StringTrimming.EllipsisWord' },
        { value: 'EllipsisPath', displayValue: 'Ellipsis Path', localizationId: 'System.Drawing.StringTrimming.EllipsisPath' }
    ]
};
exports.size = { propertyName: 'size', modelName: '@SizeF', from: analytics_elements_1.Size.fromString, displayName: 'Size', localizationId: 'DevExpress.XtraReports.UI.XRControl.Size', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizable: true };
exports.location = { propertyName: 'location', modelName: '@LocationFloat', from: analytics_elements_1.Point.fromString, displayName: 'Location', localizationId: 'DevExpress.XtraReports.UI.XRControl.Location', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizable: true };
exports.defaultBooleanValuesArray = [
    { value: 'True', displayValue: 'True', localizationId: 'DevExpress.Utils.DefaultBoolean.True' },
    { value: 'False', displayValue: 'False', localizationId: 'DevExpress.Utils.DefaultBoolean.False' },
    { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Utils.DefaultBoolean.Default' }
];
exports.tag = { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '' };
exports.lockedInUserDesigner = { propertyName: '_lockedInUserDesigner', modelName: '@LockedInUserDesigner', defaultVal: false, from: analytics_utils_1.parseBool };
exports.visible = { propertyName: 'visible', modelName: '@Visible', localizable: true, defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible' };
exports.backColor = analytics_internal_1.extend({ displayName: 'Background Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor' }, metadata_1.previewBackColor);
exports.foreColor = analytics_internal_1.extend({ displayName: 'Foreground Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.ForeColor' }, metadata_1.previewForeColor);
exports.font = analytics_internal_1.extend({ displayName: 'Font', editor: analytics_widgets_1.editorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font', localizable: true }, metadata_1.previewFont);
exports.expressionableFont = analytics_internal_1.extend({}, exports.font, { editor: editorTemplates_1.designerEditorTemplates.getEditor('expressionableFont') });
exports.expressionableFontInfo = [
    analytics_widgets_metadata_1.fontName,
    analytics_widgets_metadata_1.fontSize,
    analytics_widgets_metadata_1.fontSizeUnit,
    {
        propertyName: 'modificators', editor: editorTemplates_1.designerEditorTemplates.getEditor('fontModificatorsHighlightable')
    },
];
exports.borderColor = analytics_internal_1.extend({ displayName: 'Border Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderColor' }, metadata_1.previewBorderColor);
exports.borders = { propertyName: 'borders', modelName: '@Borders', displayName: 'Borders', localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders', editor: analytics_widgets_1.editorTemplates.getEditor('borders') };
exports.borderWidth = { propertyName: 'borderWidth', modelName: '@BorderWidth', displayName: 'Border Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderWidth', from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.borderDashStyle = analytics_internal_1.extend({
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Border Dash Style', localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderDashStyle',
    valuesArray: [].concat(exports.borderDashStyleValues, [{ value: 'Double', displayValue: 'Double', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.Double' }])
}, metadata_1.previewBorderDashStyle);
exports.paddingString = { propertyName: 'padding', modelName: '@Padding' };
exports.padding = { displayName: 'Padding', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), propertyName: 'paddingObj', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.PaddingInfo' };
exports.textAlignment = analytics_internal_1.extend({
    displayName: 'Text Alignment',
    modelName: '@TextAlignment',
    editor: analytics_widgets_1.editorTemplates.getEditor('textAlignment'),
    localizationId: 'DevExpress.XtraReports.UI.XRControl.TextAlignment'
}, metadata_1.previewTextAlignment);
exports.textFitMode = {
    propertyName: 'textFitMode',
    modelName: '@TextFitMode', displayName: 'Text Fit Mode', localizationId: 'DevExpress.XtraReports.UI.XRLabel.TextFitMode', defaultVal: 'None',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.None' },
        { value: 'GrowOnly', displayValue: 'Grow Only', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.GrowOnly' },
        { value: 'ShrinkOnly', displayValue: 'Shrink Only', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.ShrinkOnly' },
        { value: 'ShrinkAndGrow', displayValue: 'Shrink And Grow', localizationId: 'DevExpress.XtraReports.UI.TextFitMode.ShrinkAndGrow' }
    ]
};
exports.angle = { propertyName: 'angle', modelName: '@Angle', defaultVal: 0, from: analytics_utils_1.floatFromModel, displayName: 'Angle', localizationId: 'DevExpress.XtraReports.UI.XRLabel.Angle', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.canGrow = { propertyName: 'canGrow', modelName: '@CanGrow', defaultVal: true, from: analytics_utils_1.parseBool, displayName: 'Can Grow', localizationId: 'DevExpress.XtraReports.UI.XRControl.CanGrow', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.canShrink = { propertyName: 'canShrink', modelName: '@CanShrink', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Can Shrink', localizationId: 'DevExpress.XtraReports.UI.XRControl.CanShrink', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.multiline = { propertyName: 'multiline', modelName: '@Multiline', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Multiline', localizationId: 'DevExpress.XtraReports.UI.XRLabel.Multiline', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.wordWrap = { propertyName: 'wordWrap', modelName: '@WordWrap', defaultVal: true, from: analytics_utils_1.parseBool, displayName: 'Word Wrap', localizationId: 'DevExpress.XtraReports.UI.XRControl.WordWrap', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.allowMarkupText = { propertyName: 'allowMarkupText', modelName: '@AllowMarkupText', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Allow Markup Text', localizationId: 'DevExpress.XtraReports.UI.XRLabel.AllowMarkupText', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.autoWidth = { propertyName: 'autoWidth', modelName: '@AutoWidth', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Auto Width', localizationId: 'DevExpress.XtraReports.UI.XRLabel.AutoWidth', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.keepTogether = { propertyName: 'keepTogether', modelName: '@KeepTogether', defaultVal: true, from: analytics_utils_1.parseBool, displayName: 'Keep Together', localizationId: 'DevExpress.XtraReports.UI.XRControl.KeepTogether', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.keepTogetherDefaultValueFalse = { propertyName: 'keepTogether', modelName: '@KeepTogether', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Keep Together', localizationId: 'DevExpress.XtraReports.UI.XRControl.KeepTogether', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.processDuplicatesTarget = {
    propertyName: 'processDuplicatesTarget', modelName: '@ProcessDuplicatesTarget', displayName: 'Process Duplicates Target', localizationId: 'DevExpress.XtraReports.UI.XRLabel.ProcessDuplicatesTarget',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: 'Value', displayValue: 'Value', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesTarget.Value' },
        { value: 'Tag', displayValue: 'Tag', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesTarget.Tag' }
    ]
};
exports.processDuplicatesMode = {
    propertyName: 'processDuplicatesMode', modelName: '@ProcessDuplicatesMode', displayName: 'Process Duplicates Mode', localizationId: 'DevExpress.XtraReports.UI.XRLabel.ProcessDuplicatesMode',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Leave', from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: 'Leave', displayValue: 'Leave', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Leave' },
        { value: 'Merge', displayValue: 'Merge', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Merge' },
        { value: 'Suppress', displayValue: 'Suppress', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Suppress' },
        { value: 'SuppressAndShrink', displayValue: 'Suppress and Shrink', localizationId: 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.SuppressAndShrink' }
    ]
};
exports.processNullValues = {
    propertyName: 'processNullValues',
    modelName: '@ProcessNullValues', displayName: 'Process Null Values', localizationId: 'DevExpress.XtraReports.UI.XRLabel.ProcessNullValues',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Leave', from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: 'Leave', displayValue: 'Leave', localizationId: 'DevExpress.XtraReports.UI.ValueSuppressType.Leave' },
        { value: 'Suppress', displayValue: 'Suppress', localizationId: 'DevExpress.XtraReports.UI.ValueSuppressType.Suppress' },
        { value: 'SuppressAndShrink', displayValue: 'Suppress and Shrink', localizationId: 'DevExpress.XtraReports.UI.ValueSuppressType.SuppressAndShrink' },
    ]
};
exports.reportPrintOptionsSerializationInfo = [
    { propertyName: 'printOnEmptyDataSource', defaultVal: true, from: analytics_utils_1.parseBool, modelName: '@PrintOnEmptyDataSource', displayName: 'Print when Data Source is Empty', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.PrintOnEmptyDataSource', editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
    { propertyName: 'detailCountAtDesignTime', defaultVal: 0, from: analytics_utils_1.floatFromModel, modelName: '@DetailCountAtDesignTime', displayName: 'Detail Count at Design Time', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCountAtDesignTime', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    { propertyName: 'detailCountOnEmptyDataSource', defaultVal: 1, from: analytics_utils_1.floatFromModel, modelName: '@DetailCountOnEmptyDataSource', displayName: 'Detail Count when Data Source is Empty', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCountOnEmptyDataSource', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    { propertyName: 'blankDetailCount', defaultVal: 0, from: analytics_utils_1.floatFromModel, modelName: '@BlankDetailCount', displayName: 'Blank Detail Count', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.BlankDetailCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    { propertyName: 'detailCount', defaultVal: 0, from: analytics_utils_1.floatFromModel, modelName: '@DetailCount', displayName: 'Detail Count', localizationId: 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }
];
exports.dataAdapter = { propertyName: 'dataAdapter', modelName: '@DataAdapter', link: true, editor: null };
exports.dataSource = { propertyName: 'dataSource', modelName: '@DataSource', displayName: 'Data Source', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.DataSource', link: true, editor: editorTemplates_1.designerEditorTemplates.getEditor('dataSource') };
exports.dataMember = { propertyName: 'dataMember', modelName: '@DataMember', displayName: 'Data Member', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.DataMember', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('dataMember') };
exports.filterString = { propertyName: '_filterString', modelName: '@FilterString' };
exports.filterStringEditable = { propertyName: 'filterString', displayName: 'Filter String', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.FilterString', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('filterEditor') };
exports.bookmark = { propertyName: 'bookmark', localizable: true, modelName: '@Bookmark', displayName: 'Bookmark', localizationId: 'DevExpress.XtraReports.UI.XRControl.Bookmark', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.bookmarkParent = { propertyName: 'bookmarkParent', modelName: '@BookmarkParent', link: true, displayName: 'Parent Bookmark', localizationId: 'DevExpress.XtraReports.UI.XRControl.BookmarkParent', defaultVal: null, editor: editorTemplates_1.designerEditorTemplates.getEditor('reportExplorer') };
exports.navigateUrl = { propertyName: 'navigateUrl', modelName: '@NavigateUrl', displayName: 'Navigation URL', localizationId: 'DevExpress.XtraReports.UI.XRControl.NavigateUrl', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.target = { propertyName: 'target', modelName: '@Target', displayName: 'Navigation Target', localizationId: 'DevExpress.XtraReports.UI.XRControl.Target', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '' };
exports.nullValueText = { propertyName: 'nullValueText', modelName: '@NullValueText', localizable: true, displayName: 'Null Value Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.NullValueText', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
function getSummaryFunctionValues() {
    if (settings_1.DataBindingMode() === 'Bindings') {
        var values = exports.summaryFunctionValues.concat([]);
        values.push({ value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Custom' });
        return values;
    }
    return exports.summaryFunctionValues;
}
exports.getSummaryFunctionValues = getSummaryFunctionValues;
exports.summaryFunctionValues = [
    { value: 'Avg', displayValue: 'Average', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Avg' },
    { value: 'Count', displayValue: 'Count', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Count' },
    { value: 'Sum', displayValue: 'Sum', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Sum' },
    { value: 'RunningSum', displayValue: 'Running Summary', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.RunningSum' },
    { value: 'Percentage', displayValue: 'Percentage', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Percentage' },
    { value: 'Max', displayValue: 'Max', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Max' },
    { value: 'Min', displayValue: 'Min', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Min' },
    { value: 'Median', displayValue: 'Median', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Median' },
    { value: 'Var', displayValue: 'Variance', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.Var' },
    { value: 'VarP', displayValue: 'Population Variance', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.VarP' },
    { value: 'StdDev', displayValue: 'Standard Deviation', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.StdDev' },
    { value: 'StdDevP', displayValue: 'Standard Population Deviation', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.StdDevP' },
    { value: 'DAvg', displayValue: 'Average (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DAvg' },
    { value: 'DCount', displayValue: 'Count (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DCount' },
    { value: 'DSum', displayValue: 'Summary (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DSum' },
    { value: 'DVar', displayValue: 'Variance (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DVar' },
    { value: 'DVarP', displayValue: 'Population Variance (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DVarP' },
    { value: 'DStdDev', displayValue: 'Standard Deviation (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DStdDev' },
    { value: 'DStdDevP', displayValue: 'Standard Population Deviation (Distinct)', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.DStdDevP' },
    { value: 'RecordNumber', displayValue: 'Record Number', localizationId: 'DevExpress.XtraReports.UI.SummaryFunc.RecordNumber' }
];
exports.textFormatString = { propertyName: 'textFormatString', localizable: true, modelName: '@TextFormatString', defaultVal: '', editor: editorTemplates_1.designerEditorTemplates.getEditor('formatEditor'), displayName: 'Text Format String', localizationId: 'DevExpress.XtraReports.UI.XRControl.TextFormatString' };
function createSummarySerializationInfo(summaryFunctions) {
    if (summaryFunctions === void 0) { summaryFunctions = getSummaryFunctionValues(); }
    return [
        {
            propertyName: 'Running', modelName: '@Running', defaultVal: 'None',
            editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Running', localizationId: 'DevExpress.XtraReports.UI.XRSummary.Running',
            valuesArray: [
                { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.None' },
                { value: 'Group', displayValue: 'Group', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.Group' },
                { value: 'Report', displayValue: 'Report', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.Report' },
                { value: 'Page', displayValue: 'Page', localizationId: 'DevExpress.XtraReports.UI.SummaryRunning.Page' }
            ]
        },
        {
            propertyName: 'Func', modelName: '@Func', defaultVal: 'Sum',
            editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Function', localizationId: 'DevExpress.XtraReports.UI.XRSummary.Func',
            valuesArray: summaryFunctions
        },
        { propertyName: 'formatString', visible: false, modelName: '@FormatString', defaultVal: '', editor: editorTemplates_1.designerEditorTemplates.getEditor('formatEditor'), displayName: 'Format String', localizationId: 'DevExpress.XtraReports.UI.XRSummary.FormatString' },
        { propertyName: 'ignoreNullValues', modelName: '@IgnoreNullValues', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), displayName: 'Ignore Null Values', localizationId: 'DevExpress.XtraReports.UI.XRSummary.IgnoreNullValues', },
        { propertyName: 'treatStringsAsNumerics', modelName: '@TreatStringsAsNumerics', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), displayName: 'Treat Strings As Numerics', localizationId: 'DevExpress.XtraReports.UI.XRSummary.TreatStringsAsNumerics' }
    ];
}
exports.createSummarySerializationInfo = createSummarySerializationInfo;
exports.summarySerializationInfo = createSummarySerializationInfo();
exports.summary = { propertyName: 'Summary', modelName: 'Summary', info: exports.summarySerializationInfo, editor: editorTemplates_1.designerEditorTemplates.getEditor('summaryEditor'), displayName: 'Summary', localizationId: 'DevExpress.XtraReports.UI.XRLabel.Summary' };
exports.reportPrintOptions = { propertyName: 'reportPrintOptions', modelName: 'ReportPrintOptions', info: exports.reportPrintOptionsSerializationInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), displayName: 'Report Print Options', localizationId: 'DevExpress.XtraReports.UI.XtraReport.ReportPrintOptions' };
exports.lineWidth = { propertyName: 'lineWidth', modelName: '@LineWidth', defaultVal: 1, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Line Width', localizationId: 'DevExpress.XtraReports.UI.XRLine.LineWidth' };
exports.lineStyle = {
    propertyName: 'lineStyle',
    modelName: '@LineStyle', defaultVal: 'Solid', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Line Style', localizationId: 'DevExpress.XtraReports.UI.XRLine.LineStyle',
    valuesArray: [
        { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.DashStyle.Solid' },
        { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraCharts.DashStyle.Dash' },
        { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.Dot' },
        { value: 'DashDot', displayValue: 'Dash-Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.DashDot' },
        { value: 'DashDotDot', displayValue: 'Dash-Dot-Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.DashDotDot' }
    ]
};
exports.dpi = { propertyName: 'dpi', modelName: '@Dpi', defaultVal: 100, from: analytics_utils_1.floatFromModel };
exports.canPublish = { propertyName: 'canPublish', modelName: '@CanPublish', displayName: 'Can Publish', localizationId: 'DevExpress.XtraReports.UI.XRControl.CanPublish', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.rtl = {
    propertyName: 'rightToLeft', modelName: '@RightToLeft', displayName: 'Right To Left', localizationId: 'DevExpress.XtraReports.UI.XRControl.RightToLeft', defaultVal: 'Inherit', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'No', displayValue: 'No', localizationId: 'DevExpress.XtraReports.UI.RightToLeft.No' },
        { value: 'Yes', displayValue: 'Yes', localizationId: 'DevExpress.XtraReports.UI.RightToLeft.Yes' },
        { value: 'Inherit', displayValue: 'Inherit', localizationId: 'DevExpress.XtraReports.UI.RightToLeft.Inherit' }
    ]
};
exports.imageType = {
    propertyName: 'imageType', displayName: 'Image Type', localizationId: 'DevExpress.XtraReports.UI.XRChart.ImageType', modelName: '@ImageType', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Metafile', valuesArray: [
        { value: 'Metafile', displayValue: 'Metafile', localizationId: 'DevExpress.XtraReports.UI.ChartImageType.Metafile' },
        { value: 'Bitmap', displayValue: 'Bitmap', localizationId: 'DevExpress.XtraReports.UI.ChartImageType.Bitmap' }
    ]
};
exports.paddingGroup = [exports.paddingString, exports.padding];
exports.accessibleDescription = {
    propertyName: 'accessibleDescription', displayName: 'Accessible Description', localizationId: 'DevExpress.XtraReports.UI.XRControl.AccessibleDescription', modelName: '@AccessibleDescription', editor: analytics_widgets_1.editorTemplates.getEditor('text')
};
exports.cells = { propertyName: 'cells', modelName: 'Cells', array: true };
exports.sortOrder = {
    propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'Sort Order', localizationId: 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.SortOrder', defaultVal: 'None', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        {
            value: 'None', displayValue: 'None', localizationId: 'DevExpress.Data.ColumnSortOrder.None'
        }, {
            value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.Data.ColumnSortOrder.Ascending'
        }, {
            value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.Data.ColumnSortOrder.Descending'
        }
    ]
};
