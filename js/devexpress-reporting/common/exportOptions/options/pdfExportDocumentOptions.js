﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfExportDocumentOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var PdfExportDocumentOptions = (function () {
    function PdfExportDocumentOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    PdfExportDocumentOptions.from = function (model, serializer) {
        return new PdfExportDocumentOptions(model || {}, serializer);
    };
    PdfExportDocumentOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, exports.pdfExportDocumentOptionsSerializationInfo, refs);
    };
    PdfExportDocumentOptions.prototype.getInfo = function () {
        return exports.pdfExportDocumentOptionsSerializationInfo;
    };
    return PdfExportDocumentOptions;
}());
exports.PdfExportDocumentOptions = PdfExportDocumentOptions;
exports.author = { propertyName: 'author', modelName: '@Author', displayName: 'Author', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Author', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.application = { propertyName: 'application', modelName: '@Application', displayName: 'Application', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Application', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.title = { propertyName: 'title', modelName: '@Title', displayName: 'Title', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Title', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.subject = { propertyName: 'subject', modelName: '@Subject', displayName: 'Subject', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Subject', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.pdfExportDocumentOptionsSerializationInfo = [
    exports.author, exports.application, exports.title, exports.subject,
    { propertyName: 'keywords', modelName: '@Keywords', displayName: 'Keywords', localizationId: 'DevExpress.XtraPrinting.PdfDocumentOptions.Keywords', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') }
];
