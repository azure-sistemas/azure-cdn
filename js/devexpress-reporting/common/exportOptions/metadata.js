﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\metadata.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _editorTemplates_1 = require("../widgets/_editorTemplates");
exports.pageBorderColor = { propertyName: 'pageBorderColor', modelName: '@PageBorderColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, displayName: 'Page Border Color', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'Black' };
exports.pageBorderWidth = { propertyName: 'pageBorderWidth', modelName: '@PageBorderWidth', displayName: 'Page Border Width', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderWidth', from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1 };
exports.pageRange = { propertyName: 'pageRange', modelName: '@PageRange', displayName: 'Page Range', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageRange', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '' };
exports.expotOptionsTitle = { propertyName: 'title', modelName: '@Title', displayName: 'Title', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.Title', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: 'Document' };
exports.htmlTableLayout = { propertyName: 'tableLayout', modelName: '@TableLayout', displayName: 'Table Layout', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.TableLayout', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: true };
exports.docxTableLayout = { propertyName: 'tableLayout', modelName: '@TableLayout', displayName: 'Table Layout', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.TableLayout', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: false };
exports.allowURLsWithJSContent = { propertyName: 'allowURLsWithJSContent', modelName: '@AllowURLsWithJSContent', displayName: 'Allow URLs with JS Content', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.AllowURLsWithJSContent', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: false };
exports.rasterizationResolution = { propertyName: 'rasterizationResolution', modelName: '@RasterizationResolution', displayName: 'Rasterization Resolution', localizationId: 'DevExpress.XtraPrinting.PageByPageExportOptionsBase.RasterizationResolution', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 96 };
exports.rasterizeImages = { propertyName: 'rasterizeImages', modelName: '@RasterizeImages', displayName: 'Rasterize Images', localizationId: 'DevExpress.XtraPrinting.PageByPageExportOptionsBase.RasterizeImages', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.useHRefHyperlinks = { propertyName: 'useHRefHyperlinks', modelName: '@UseHRefHyperlinks', displayName: 'Use HRef Hyperlinks', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.UseHRefHyperlinks', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: false };
exports.exportWatermarks = { propertyName: 'exportWatermarks', modelName: '@ExportWatermarks', displayName: 'Export Watermarks', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportWatermarks', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.inlineCss = { propertyName: 'inlineCss', modelName: '@InlineCss', displayName: 'Inline CSS', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.InlineCss', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.removeSecondarySymbols = { propertyName: 'removeSecondarySymbols', modelName: '@RemoveSecondarySymbols', displayName: 'Remove Secondary Symbols', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.RemoveSecondarySymbols', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: false };
exports.characterSet = {
    propertyName: 'characterSet', modelName: '@CharacterSet', displayName: 'Character Set', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.CharacterSet', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'utf-8',
    valuesArray: [{ value: 'windows-1256', displayValue: 'Arabic (Windows)' }, { value: 'iso-8859-4', displayValue: 'Baltic (ISO)' }, { value: 'windows-1257', displayValue: 'Baltic (Windows)' }, { value: 'iso-8859-2', displayValue: 'Central European (ISO)' }, { value: 'windows-1250', displayValue: 'Central European (Windows)' }, { value: 'iso-8859-5', displayValue: 'Cyrillic (ISO)' }, { value: 'koi8-r', displayValue: 'Cyrillic (KOI8-r)' }, { value: 'windows-1251', displayValue: 'Cyrillic (Windows)' }, { value: 'iso-8859-15', displayValue: 'Latin 9 (ISO)' }, { value: 'utf-7', displayValue: 'Unicode (UTF-7)' }, { value: 'utf-8', displayValue: 'Unicode (UTF-8)' }, { value: 'iso-8859-1', displayValue: 'Western European (ISO)' }, { value: 'windows-1252', displayValue: 'Western European (Windows)' }]
};
function getExportModeValues(format, preview, merged) {
    if (format === void 0) { format = 'Html'; }
    var singleFile = { value: 'SingleFile', displayValue: 'Single File', localizationId: analytics_internal_1.formatUnicorn('PreviewStringId.ExportOption_{0}ExportMode_SingleFile', format) };
    var singleFilePageByPage = { value: 'SingleFilePageByPage', displayValue: 'Single File PageByPage', localizationId: analytics_internal_1.formatUnicorn('PreviewStringId.ExportOption_{0}ExportMode_SingleFilePageByPage', format) };
    var differentFiles = { value: 'DifferentFiles', displayValue: 'Different Files', localizationId: analytics_internal_1.formatUnicorn('PreviewStringId.ExportOption_{0}ExportMode_DifferentFiles', format) };
    if (merged) {
        return [singleFilePageByPage];
    }
    else if (preview) {
        return [singleFile, singleFilePageByPage];
    }
    else {
        return [singleFile, singleFilePageByPage, differentFiles];
    }
}
exports.getExportModeValues = getExportModeValues;
exports.exportPageBreaks = { propertyName: 'exportPageBreaks', modelName: '@ExportPageBreaks', displayName: 'Export Page Breaks', localizationId: 'DevExpress.XtraPrinting.FormattedTextExportOptions.ExportPageBreaks', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.rtfExportMode = {
    propertyName: 'rtfExportMode', modelName: '@ExportMode', defaultVal: 'SingleFilePageByPage',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions.ExportMode',
    valuesArray: getExportModeValues('Rtf', true)
};
exports.docxExportMode = {
    propertyName: 'docxExportMode', modelName: '@ExportMode', defaultVal: 'SingleFilePageByPage',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.ExportMode',
    valuesArray: getExportModeValues('Docx', true)
};
exports.htmlExportMode = {
    propertyName: 'htmlExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportMode',
    valuesArray: getExportModeValues('Html')
};
exports.embedImagesInHTML = {
    propertyName: 'embedImagesInHTML', modelName: '@EmbedImagesInHTML', defaultVal: false,
    editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, displayName: 'Embed Images In HTML', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions.EmbedImagesInHTML'
};
exports.imageExportMode = {
    propertyName: 'imageExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.ExportMode',
    valuesArray: getExportModeValues('Image')
};
exports.xlsExportMode = {
    propertyName: 'xlsExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.ExportMode',
    valuesArray: getExportModeValues('Xls')
};
exports.xlsxExportMode = {
    propertyName: 'xlsxExportMode', modelName: '@ExportMode', defaultVal: 'SingleFile',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Export Mode', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions.ExportMode',
    valuesArray: getExportModeValues('Xlsx')
};
function getTextExportModeValues() {
    return [
        { value: 'Text', displayValue: 'Text', localizationId: 'DevExpress.XtraPrinting.TextExportMode.Text' },
        { value: 'Value', displayValue: 'Value', localizationId: 'DevExpress.XtraPrinting.TextExportMode.Value' }
    ];
}
exports.textExportMode = {
    propertyName: 'textExportMode', modelName: '@TextExportMode', displayName: 'Text Export Mode', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.TextExportMode', defaultVal: 'Text', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: getTextExportModeValues()
};
exports.xlsTextExportMode = {
    propertyName: 'textExportMode', modelName: '@TextExportMode', displayName: 'Text Export Mode', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.TextExportMode', defaultVal: 'Value', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: getTextExportModeValues()
};
exports.csvTextSeparator = { propertyName: 'separator', modelName: '@Separator', defaultVal: '', displayName: 'Separator', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.Separator', editor: _editorTemplates_1.editorTemplates.csvSeparator };
exports.useCustomSeparator = { propertyName: 'useCustomSeparator', displayName: 'Use Custom Separator', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions.UseCustomSeparator', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.textEncodingType = {
    propertyName: 'encodingType', modelName: '@EncodingType', displayName: 'Encoding', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.Encoding', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Default', from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: 'Default', displayValue: 'Windows-1252', localizationId: 'DevExpress.XtraPrinting.EncodingType.Default' },
        { value: 'ASCII', displayValue: 'us-ascii', localizationId: 'DevExpress.XtraPrinting.EncodingType.ASCII' },
        { value: 'Unicode', displayValue: 'utf-16', localizationId: 'DevExpress.XtraPrinting.EncodingType.Unicode' },
        { value: 'BigEndianUnicode', displayValue: 'utf-16BE', localizationId: 'DevExpress.XtraPrinting.EncodingType.BigEndianUnicode' },
        { value: 'UTF7', displayValue: 'utf-7', localizationId: 'DevExpress.XtraPrinting.EncodingType.UTF7' },
        { value: 'UTF8', displayValue: 'utf-8', localizationId: 'DevExpress.XtraPrinting.EncodingType.UTF8' },
        { value: 'UTF32', displayValue: 'utf-32', localizationId: 'DevExpress.XtraPrinting.EncodingType.UTF32' }
    ]
};
exports.xlsExportHyperlinks = {
    propertyName: 'exportHyperlinks', modelName: '@ExportHyperlinks', displayName: 'Export Hyperlinks', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.ExportHyperlinks', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool
};
exports.xlsRawDataMode = {
    propertyName: 'rawDataMode', modelName: '@RawDataMode', displayName: 'Raw Data Mode', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.RawDataMode', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool
};
exports.xlsShowGridLines = {
    propertyName: 'showGridLines', modelName: '@ShowGridLines', displayName: 'Show Grid Lines', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.ShowGridLines', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool
};
exports.xlsExportOptionsSheetName = {
    propertyName: 'sheetName', modelName: '@SheetName', displayName: 'Sheet Name', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.SheetName', defaultVal: 'Sheet', editor: analytics_widgets_1.editorTemplates.getEditor('text')
};
