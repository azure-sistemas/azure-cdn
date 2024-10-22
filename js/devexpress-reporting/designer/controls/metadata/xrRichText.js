﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrRichText.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("./properties/metadata");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var metadataGroups_1 = require("./properties/metadataGroups");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var _metaUtils_1 = require("../utils/_metaUtils");
exports.rtf = { propertyName: '_rtf', defaultVal: '', displayName: 'RTF', editor: analytics_widgets_1.editorTemplates.getEditor('stringArray'), localizationId: 'ASPxReportsStringId.ExportName_rtf' };
exports.textRtf = { propertyName: 'textRtf', defaultVal: '', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRRichTextBase.RtfText', editor: analytics_widgets_1.editorTemplates.getEditor('stringArray') };
exports.serializableRtfString = { propertyName: 'serializableRtfString', modelName: '@SerializableRtfString' };
exports.newDocumentData = { propertyName: '_newDocumentData', displayName: 'Load File', localizationId: 'AnalyticsCoreStringId.UploadFile', editor: editorTemplates_1.designerEditorTemplates.getEditor('richTextLoad') };
exports.richTextSerializationsInfo = [
    exports.serializableRtfString,
    exports.rtf, exports.textRtf,
    exports.newDocumentData,
    metadata_1.nullValueText, metadata_1.keepTogetherDefaultValueFalse, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.textControlScripts,
    dataBinding_1.dataBindings(['Bookmark', 'Html', 'NavigateUrl', 'Rtf', 'Tag']),
    _metaUtils_1.createPopularBindingInfo({ bindingName: 'Html', propertyName: 'popularDataBindingHtml', displayName: 'Html Data Binding', localizationId: 'ReportStringId.STag_Name_HtmlDataBinding' }, false),
    _metaUtils_1.createPopularBindingInfo({ bindingName: 'Html', propertyName: 'popularExpressionHtml', displayName: 'Html Expression', localizationId: 'ReportStringId.STag_Name_HtmlExpressionBinding' }),
    _metaUtils_1.createPopularBindingInfo({ bindingName: 'Rtf', propertyName: 'popularDataBindingRtf', displayName: 'Rtf Data Binding', localizationId: 'ReportStringId.STag_Name_RtfDataBinding' }, false),
    _metaUtils_1.createPopularBindingInfo({ bindingName: 'Rtf', propertyName: 'popularExpressionRtf', displayName: 'Rtf Expression', localizationId: 'ReportStringId.STag_Name_RtfExpressionBinding' }),
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.fontGroup, metadataGroups_1.commonControlProperties, metadataGroups_1.navigationGroup, metadataGroups_1.processGroup, metadataGroups_1.canGrowShrinkGroup).filter(function (x) { return x != metadata_1.accessibleDescription; });
exports.popularPropertiesRichText = ['rtf', 'popularDataBindingRtf', 'popularExpressionRtf', 'html', 'popularDataBindingHtml', 'popularExpressionHtml', '_newDocumentData', 'bookmark', 'bookmarkParent', 'canGrow', 'canShrink'];
