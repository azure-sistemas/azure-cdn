﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\docxExportDocumentOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var DocxExportDocumentOptions = (function () {
    function DocxExportDocumentOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    DocxExportDocumentOptions.from = function (model, serializer) {
        return new DocxExportDocumentOptions(model || {}, serializer);
    };
    DocxExportDocumentOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, exports.docxExportDocumentOptionsSerializationInfo, refs);
    };
    DocxExportDocumentOptions.prototype.getInfo = function () {
        return exports.docxExportDocumentOptionsSerializationInfo;
    };
    return DocxExportDocumentOptions;
}());
exports.DocxExportDocumentOptions = DocxExportDocumentOptions;
exports.docxExportDocumentOptionsSerializationInfo = [
    { propertyName: 'title', modelName: '@Title', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Title', displayName: 'Title', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'subject', modelName: '@Subject', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Subject', displayName: 'Subject', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'keywords', modelName: '@Keywords', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Keywords', displayName: 'Keywords', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'category', modelName: '@Category', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Category', displayName: 'Category', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'comments', modelName: '@Comments', localizationId: 'DevExpress.XtraPrinitng.DocxDocumentOptions.Comments', displayName: 'Comments', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'author', modelName: '@Author', localizationId: 'DevExpress.XtraPrinting.DocxDocumentOptions.Author', displayName: 'Author', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
];
