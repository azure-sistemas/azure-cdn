﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableOfContents.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./properties/metadata");
var xrTableOfContentsLevel_1 = require("./xrTableOfContentsLevel");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var size = { propertyName: 'size', modelName: '@SizeF', from: analytics_elements_1.Size.fromString };
var formattingRuleLinks = {
    propertyName: 'formattingRuleLinks', modelName: 'FormattingRuleLinks'
};
exports.tocTitleSerializationsInfo = [metadata_1.text, $.extend({}, metadata_1.textAlignment, { defaultVal: 'TopLeft' })].concat(xrTableOfContentsLevel_1.baseTocLevelSerializationsInfo);
exports.tocTitle = { propertyName: 'levelTitle', modelName: 'LevelTitle', displayName: 'Level Title', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.LevelTitle', info: exports.tocTitleSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.tocLevelDefault = { propertyName: 'levelDefault', modelName: 'LevelDefault', displayName: 'Level Default', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.LevelDefault', info: xrTableOfContentsLevel_1.tocLevelSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.maxNestingLevel = { propertyName: 'maxNestingLevel', modelName: '@MaxNestingLevel', defaultVal: 0, displayName: 'Max Nesting Level', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.MaxNestingLevel', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), editorOptions: { min: 0 } };
exports.tocLevels = {
    propertyName: 'levels',
    modelName: 'Levels',
    displayName: 'Levels', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.Levels',
    array: true,
    editor: editorTemplates_1.designerEditorTemplates.getEditor('toclevel'),
    template: '#dxrd-collectionItemWithAccordion'
};
var tocProperties = metadataGroups_1.commonControlProperties.filter(function (item) { return item !== metadata_1.canPublish && item != metadata_1.accessibleDescription; });
exports.tocSerializationsInfo = [formattingRuleLinks, size, metadata_1.location, exports.tocTitle, exports.tocLevels, exports.tocLevelDefault, exports.maxNestingLevel, metadata_1.rtl].concat(tocProperties);
