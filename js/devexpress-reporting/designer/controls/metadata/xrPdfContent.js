﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPdfContent.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var metadataGroups_1 = require("./properties/metadataGroups");
var metadata_1 = require("./properties/metadata");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var xrSubreport_1 = require("./xrSubreport");
var metadata_2 = require("../../../common/exportOptions/metadata");
exports.pdfSource = { propertyName: 'source', modelName: '@SourceSerializable', displayName: 'Source', defaultVal: null, editor: editorTemplates_1.designerEditorTemplates.getEditor('pdfContentLoad'), localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.Source' };
exports.pdfSourceUrl = { propertyName: 'sourceUrl', modelName: '@SourceUrl', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text'), displayName: 'Source Url', localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.SourceUrl' };
var generateOwnPagesPdfContent = analytics_internal_1.extend({}, xrSubreport_1.generateOwnPages, { defaultVal: true, localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.GenerateOwnPages' });
exports.pageCount = { propertyName: 'pageCount', modelName: '@PageCount', displayName: 'PageCount', localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.PageCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), disabled: true, defaultVal: 0 };
var pageRangePdfContent = analytics_internal_1.extend({}, metadata_2.pageRange, { localizationId: 'DevExpress.XtraReports.UI.XRPdfContent.PageRange' });
exports.pdfContentSerializationInfo = [exports.pdfSource, exports.pdfSourceUrl, scriptMetadata_1.pdfContentScripts, generateOwnPagesPdfContent, pageRangePdfContent, exports.pageCount, dataBinding_1.dataBindings(['Bookmark', 'Source', 'SourceUrl', 'PageRange'])].concat(metadataGroups_1.sizeLocation, metadataGroups_1.baseControlProperties, metadataGroups_1.bookmarkGroup, [metadata_1.tag]);
exports.popularPropertiesPdfContent = ['name', 'source', 'sourceUrl', 'generateOwnPages'];
