﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\exportOptionsMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csvExportOptions_1 = require("./csvExportOptions");
var emailMetaData_1 = require("./emailMetaData");
var htmlExportOptions_1 = require("./htmlExportOptions");
var imageExportOptions_1 = require("./imageExportOptions");
var mhtExportOptions_1 = require("./mhtExportOptions");
var pdfExportOptions_1 = require("./pdfExportOptions");
var printPreviewOptions_1 = require("./printPreviewOptions");
var rtfExportOptions_1 = require("./rtfExportOptions");
var textExportOptions_1 = require("./textExportOptions");
var xlsExportOptions_1 = require("./xlsExportOptions");
var xlsxExportOptions_1 = require("./xlsxExportOptions");
var docxExportOptions_1 = require("./docxExportOptions");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.exportOptionsSerializationInfo = [
    { propertyName: 'csv', modelName: 'Csv', displayName: 'CSV Export Options', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions', from: csvExportOptions_1.CsvExportOptions.from, toJsonObject: csvExportOptions_1.CsvExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'email', modelName: 'Email', displayName: 'E-mail Options', localizationId: 'DevExpress.XtraPrinting.EmailOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: emailMetaData_1.emailOptionsSerializationInfo },
    { propertyName: 'html', modelName: 'Html', displayName: 'HTML Export Options', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions', from: htmlExportOptions_1.HtmlExportOptions.from, toJsonObject: htmlExportOptions_1.HtmlExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'image', modelName: 'Image', displayName: 'Image Export Options', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions', from: imageExportOptions_1.ImageExportOptions.from, toJsonObject: imageExportOptions_1.ImageExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'mailMessage', modelName: 'MailMessage', displayName: 'Mail Message Export Options', localizationId: 'DevExpress.XtraPrinting.MailMessageExportOptions', from: mhtExportOptions_1.MhtExportOptions.from, toJsonObject: mhtExportOptions_1.MhtExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'mht', modelName: 'Mht', displayName: 'MHT Export Options', localizationId: 'DevExpress.XtraPrinting.MhtExportOptions', from: mhtExportOptions_1.MhtExportOptions.from, toJsonObject: mhtExportOptions_1.MhtExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'nativeFormat', modelName: 'NativeFormat', displayName: 'Native Format Options', localizationId: 'DevExpress.XtraPrinting.NativeFormatOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: emailMetaData_1.nativeFormatOptionsSerializationInfo },
    { propertyName: 'pdf', modelName: 'Pdf', displayName: 'PDF Export Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions', from: pdfExportOptions_1.PdfExportOptions.from, toJsonObject: pdfExportOptions_1.PdfExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'printPreview', modelName: 'PrintPreview', displayName: 'Print Preview Options', localizationId: 'DevExpress.XtraPrinting.PrintPreviewOptions', from: printPreviewOptions_1.PrintPreviewOptions.from, toJsonObject: printPreviewOptions_1.PrintPreviewOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'rtf', modelName: 'Rtf', displayName: 'RTF Export Options', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions', from: rtfExportOptions_1.RtfExportOptions.from, toJsonObject: rtfExportOptions_1.RtfExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'textExportOptions', modelName: 'Text', displayName: 'Text Export Options', localizationId: 'DevExpress.XtraPrinting.TextExportOptions', from: textExportOptions_1.TextExportOptions.from, toJsonObject: textExportOptions_1.TextExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'xls', modelName: 'Xls', displayName: 'XLS Export Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions', from: xlsExportOptions_1.XlsExportOptions.from, toJsonObject: xlsExportOptions_1.XlsExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'xlsx', modelName: 'Xlsx', displayName: 'XLSx Export Options', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions', from: xlsxExportOptions_1.XlsxExportOptions.from, toJsonObject: xlsxExportOptions_1.XlsxExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'docx', modelName: 'Docx', displayName: 'Docx Export Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions', from: docxExportOptions_1.DocxExportOptions.from, toJsonObject: docxExportOptions_1.DocxExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') }
];
