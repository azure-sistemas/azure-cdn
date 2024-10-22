﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCheckbox.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glyphOptions_1 = require("../properties/glyphOptions");
var editOptions_1 = require("./properties/editOptions");
var editOptions_2 = require("../properties/editOptions");
var metadata_1 = require("./properties/metadata");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var _metaUtils_1 = require("../utils/_metaUtils");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var $ = require("jquery");
exports.checkState = {
    propertyName: 'checkBoxState',
    modelName: '@CheckBoxState', displayName: 'Check Box State', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.CheckBoxState', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    defaultVal: 'Unchecked',
    valuesArray: [
        { value: 'Unchecked', displayValue: 'Unchecked', localizationId: 'StringId.CheckUnchecked' },
        { value: 'Checked', displayValue: 'Checked', localizationId: 'StringId.CheckChecked' },
        { value: 'Indeterminate', displayValue: 'Indeterminate', localizationId: 'StringId.CheckIndeterminate' }
    ]
};
exports.checked = { propertyName: 'checked', modelName: '@Checked', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Checked', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.Checked', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.glyphOptions = {
    propertyName: 'glyphOptions',
    modelName: 'GlyphOptions',
    displayName: 'Glyph Options',
    localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.GlyphOptions',
    editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'),
    from: function (model, serializer) { return new glyphOptions_1.GlyphOptions(model, serializer); },
    toJsonObject: function (value, serializer) { return serializer.serialize(value); }
};
exports.checkEditOptions = $.extend({}, editOptions_1.editOptions, {
    propertyName: 'checkEditOptions',
    from: function (model, serializer) { return new editOptions_2.CheckEditOptions(model, serializer); }
});
exports.checkboxSerializationsInfo = [
    exports.checkState, exports.checked, metadata_1.text, metadata_1.textFormatString, metadata_1.wordWrap, metadata_1.keepTogether, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, exports.glyphOptions,
    $.extend({}, metadata_1.textAlignment, { defaultVal: 'MiddleLeft' }),
    scriptMetadata_1.textControlScripts, metadata_1.textTrimming, metadata_1.xlsxFormatString,
    dataBinding_1.dataBindings(['Text', 'NavigateUrl', 'Tag', 'Bookmark', 'CheckBoxState']),
    metadata_1.rtl,
    exports.checkEditOptions
].concat(_metaUtils_1.createPopularBindingInfos({ propertyName: 'CheckBoxState', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.CheckBoxState' }), _metaUtils_1.createPopularBindingInfos({ propertyName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.Text' }), metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.fontGroup, metadataGroups_1.navigationGroup);
exports.popularPropertiesCheckBox = ['checkBoxState', 'popularDataBindingCheckState', 'text', 'popularDataBindingText', 'glyphOptions', 'bookmark', 'bookmarkParent'];
