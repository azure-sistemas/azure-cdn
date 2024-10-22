﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsPreview.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var exportOptions_1 = require("../../common/exportOptions/exportOptions");
var csvExportOptionsPreview_1 = require("./csvExportOptionsPreview");
var htmlExportOptionsPreview_1 = require("./htmlExportOptionsPreview");
var imageExportOptionsPreview_1 = require("./imageExportOptionsPreview");
var mhtExportOptionsPreview_1 = require("./mhtExportOptionsPreview");
var pdfExportOptions_1 = require("../../common/exportOptions/pdfExportOptions");
var rtfExportOptionsPreview_1 = require("./rtfExportOptionsPreview");
var textExportOptions_1 = require("../../common/exportOptions/textExportOptions");
var xlsExportOptionsPreview_1 = require("./xlsExportOptionsPreview");
var xlsxExportOptionsPreview_1 = require("./xlsxExportOptionsPreview");
var docxExportOptionsPreview_1 = require("./docxExportOptionsPreview");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ExportOptionsPreview = (function (_super) {
    __extends(ExportOptionsPreview, _super);
    function ExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportOptionsPreview.prototype._generateFromFunction = function (exportType) {
        return function (model, serializer) {
            return new exportType(model || {}, serializer);
        };
    };
    ExportOptionsPreview.prototype._generateInfo = function () {
        return [
            { propertyName: 'csv', modelName: 'Csv', displayName: 'CSV Export Options', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions', from: csvExportOptionsPreview_1.CsvExportOptionsPreview.from, toJsonObject: csvExportOptionsPreview_1.CsvExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'html', modelName: 'Html', displayName: 'HTML Export Options', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions', from: this._generateFromFunction(htmlExportOptionsPreview_1.HtmlExportOptionsPreview), toJsonObject: htmlExportOptionsPreview_1.HtmlExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'image', modelName: 'Image', displayName: 'Image Export Options', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions', from: this._generateFromFunction(imageExportOptionsPreview_1.ImageExportOptionsPreview), toJsonObject: imageExportOptionsPreview_1.ImageExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'mht', modelName: 'Mht', displayName: 'MHT Export Options', localizationId: 'DevExpress.XtraPrinting.MhtExportOptions', from: this._generateFromFunction(mhtExportOptionsPreview_1.MhtExportOptionsPreview), toJsonObject: mhtExportOptionsPreview_1.MhtExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'pdf', modelName: 'Pdf', displayName: 'PDF Export Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions', from: pdfExportOptions_1.PdfExportOptions.from, toJsonObject: pdfExportOptions_1.PdfExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'rtf', modelName: 'Rtf', displayName: 'RTF Export Options', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions', from: this._generateFromFunction(rtfExportOptionsPreview_1.RtfExportOptionsPreview), toJsonObject: rtfExportOptionsPreview_1.RtfExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'textExportOptions', modelName: 'Text', displayName: 'Text Export Options', localizationId: 'DevExpress.XtraPrinting.TextExportOptions', from: textExportOptions_1.TextExportOptions.from, toJsonObject: textExportOptions_1.TextExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xls', modelName: 'Xls', displayName: 'XLS Export Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions', from: this._generateFromFunction(xlsExportOptionsPreview_1.XlsExportOptionsPreview), toJsonObject: xlsExportOptionsPreview_1.XlsExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xlsx', modelName: 'Xlsx', displayName: 'XLSx Export Options', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions', from: this._generateFromFunction(xlsxExportOptionsPreview_1.XlsxExportOptionsPreview), toJsonObject: xlsxExportOptionsPreview_1.XlsxExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'docx', modelName: 'Docx', displayName: 'Docx Export Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions', from: this._generateFromFunction(docxExportOptionsPreview_1.DocxExportOptionsPreview), toJsonObject: docxExportOptionsPreview_1.DocxExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') }
        ];
    };
    ExportOptionsPreview.prototype.hasSensitiveData = function () {
        return (this.xls && this.xls.hasSensitiveData())
            || (this.xlsx && this.xlsx.hasSensitiveData())
            || (this.pdf && this.pdf.hasSensitiveData());
    };
    ExportOptionsPreview.prototype.getInfo = function () {
        return this._generateInfo();
    };
    return ExportOptionsPreview;
}(exportOptions_1.ExportOptions));
exports.ExportOptionsPreview = ExportOptionsPreview;
var ExportOptionsMergedPreview = (function (_super) {
    __extends(ExportOptionsMergedPreview, _super);
    function ExportOptionsMergedPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportOptionsMergedPreview.prototype._generateInfo = function () {
        return [
            { propertyName: 'html', modelName: 'Html', displayName: 'HTML Export Options', localizationId: 'DevExpress.XtraPrinting.HtmlExportOptions', from: this._generateFromFunction(htmlExportOptionsPreview_1.HtmlExportOptionsMergedPreview), toJsonObject: htmlExportOptionsPreview_1.HtmlExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'image', modelName: 'Image', displayName: 'Image Export Options', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions', from: this._generateFromFunction(imageExportOptionsPreview_1.ImageExportOptionsMergedPreview), toJsonObject: imageExportOptionsPreview_1.ImageExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'mht', modelName: 'Mht', displayName: 'MHT Export Options', localizationId: 'DevExpress.XtraPrinting.MhtExportOptions', from: this._generateFromFunction(mhtExportOptionsPreview_1.MhtExportOptionsMergedPreview), toJsonObject: mhtExportOptionsPreview_1.MhtExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'pdf', modelName: 'Pdf', displayName: 'PDF Export Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions', from: pdfExportOptions_1.PdfExportOptions.from, toJsonObject: pdfExportOptions_1.PdfExportOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'rtf', modelName: 'Rtf', displayName: 'RTF Export Options', localizationId: 'DevExpress.XtraPrinting.RtfExportOptions', from: this._generateFromFunction(rtfExportOptionsPreview_1.RtfExportOptionsMergedPreview), toJsonObject: rtfExportOptionsPreview_1.RtfExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xls', modelName: 'Xls', displayName: 'XLS Export Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions', from: this._generateFromFunction(xlsExportOptionsPreview_1.XlsExportOptionsMergedPreview), toJsonObject: xlsExportOptionsPreview_1.XlsExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'xlsx', modelName: 'Xlsx', displayName: 'XLSx Export Options', localizationId: 'DevExpress.XtraPrinting.XlsxExportOptions', from: this._generateFromFunction(xlsxExportOptionsPreview_1.XlsxExportOptionsMergedPreview), toJsonObject: xlsxExportOptionsPreview_1.XlsxExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
            { propertyName: 'docx', modelName: 'Docx', displayName: 'Docx Export Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions', from: this._generateFromFunction(docxExportOptionsPreview_1.DocxExportOptionsMergedPreview), toJsonObject: docxExportOptionsPreview_1.DocxExportOptionsPreview.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') }
        ];
    };
    return ExportOptionsMergedPreview;
}(ExportOptionsPreview));
exports.ExportOptionsMergedPreview = ExportOptionsMergedPreview;
