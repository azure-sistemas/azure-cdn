﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrZipcode.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./properties/metadata");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var _metaUtils_1 = require("../utils/_metaUtils");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var $ = require("jquery");
exports.segmentWidth = { propertyName: 'segmentWidth', modelName: '@SegmentWidth', defaultVal: 4, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Segment Width', localizationId: 'DevExpress.XtraReports.UI.XRZipCode.SegmentWidth' };
exports.zipCodeSerializationInfo = [
    metadata_1.foreColor, exports.segmentWidth, metadata_1.keepTogether, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.textControlScripts,
    $.extend({}, metadata_1.text, { defaultVal: '0' }), metadata_1.textFormatString,
    dataBinding_1.dataBindings(['Bookmark', 'NavigateUrl', 'Tag', 'Text'])
].concat(_metaUtils_1.createSinglePopularBindingInfos('Text'), metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.navigationGroup);
exports.popularPropertiesZipCode = ['text', 'popularDataBinding', 'segmentWidth', 'bookmark', 'bookmarkParent'];
