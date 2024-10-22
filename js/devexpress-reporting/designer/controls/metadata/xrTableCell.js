﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableCell.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scriptMetadata_1 = require("./properties/scriptMetadata");
var metadata_1 = require("./properties/metadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var editOptions_1 = require("./properties/editOptions");
var _metaUtils_1 = require("../utils/_metaUtils");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.weight = { propertyName: 'weight', localizable: true, modelName: '@Weight', defaultVal: 0, from: analytics_utils_1.floatFromModel };
exports.rowSpan = { propertyName: 'rowSpan', modelName: '@RowSpan', displayName: 'Row Span', localizationId: 'DevExpress.XtraReports.UI.XRTableCell.RowSpan', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.tableCellSerializationsInfo = [
    exports.weight, scriptMetadata_1.labelScripts, exports.rowSpan, metadata_1.textTrimming,
    { propertyName: 'width', displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width' },
    { propertyName: 'controls', modelName: 'Controls', array: true },
    dataBinding_1.dataBindings(['Text', 'NavigateUrl', 'Tag', 'Bookmark']),
    editOptions_1.textEditOptions, metadata_1.allowMarkupText
].concat(_metaUtils_1.createSinglePopularBindingInfos('Text'), metadataGroups_1.labelGroup);
exports.popularPropertiesTableCell = ['text', 'textArea', 'popularDataBinding', 'textFormatString', 'Summary', 'canGrow', 'canShrink', 'multiline', 'wordWrap'];
