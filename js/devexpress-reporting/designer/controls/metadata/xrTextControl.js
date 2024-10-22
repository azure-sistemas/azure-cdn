﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTextControl.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editOptions_1 = require("./properties/editOptions");
var metadata_1 = require("./properties/metadata");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var _metaUtils_1 = require("../utils/_metaUtils");
var metadataGroups_1 = require("./properties/metadataGroups");
exports.labelSerializationsInfo = [
    editOptions_1.textEditOptions,
    metadata_1.allowMarkupText, metadata_1.autoWidth, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.labelScripts, metadata_1.textTrimming,
    dataBinding_1.dataBindings(['Text', 'NavigateUrl', 'Tag', 'Bookmark'])
].concat(_metaUtils_1.createSinglePopularBindingInfos('Text'), metadataGroups_1.sizeLocation, metadataGroups_1.labelGroup);
exports.popularPropertiesLabel = ['text', 'textArea', 'popularDataBinding', 'textFormatString', 'Summary', 'angle', 'bookmark', 'bookmarkParent', 'autoWidth', 'canGrow', 'canShrink', 'multiline', 'wordWrap'];
