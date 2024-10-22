﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\glyphOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("../../../../viewer/internal/_utils");
var checkEditingField_1 = require("../../../../viewer/editing/models/checkEditingField");
var glyphsInfo_1 = require("../../properties/glyphsInfo");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var $ = require("jquery");
exports.glyphAlignment = {
    propertyName: 'alignment',
    modelName: '@Alignment', displayName: 'Alignment', localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.GlyphAlignment',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    defaultVal: 'Near', valuesArray: [
        { value: 'Near', displayValue: 'Near', localizationId: 'DevExpress.Utils.HorzAlignment.Near' },
        { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.Utils.HorzAlignment.Center' },
        { value: 'Far', displayValue: 'Far', localizationId: 'DevExpress.Utils.HorzAlignment.Far' }
    ]
};
var _checkStates = _utils_1.getEnumValues(checkEditingField_1.CheckState);
var customGlyphChecked = glyphsInfo_1._getCustomGlyphsInfo(_checkStates[checkEditingField_1.CheckState.Checked]);
var customGlyphUnChecked = glyphsInfo_1._getCustomGlyphsInfo(_checkStates[checkEditingField_1.CheckState.Unchecked]);
var customGlyphIndeterminate = glyphsInfo_1._getCustomGlyphsInfo(_checkStates[checkEditingField_1.CheckState.Indeterminate]);
var customGlyphsSerializationInfo = [customGlyphChecked, customGlyphUnChecked, customGlyphIndeterminate];
var customGlyphs = { propertyName: 'customGlyphs', modelName: 'CustomGlyphs', info: customGlyphsSerializationInfo, displayName: 'Custom Glyphs', localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphOptions.CustomGlyphs', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
var style = {
    propertyName: 'style',
    modelName: '@Style', displayName: 'Glyph Style', localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphOptions.Style',
    editor: $.extend({}, analytics_widgets_1.editorTemplates.getEditor('combobox'), { header: 'dxrd-checkbox-style-combobox' }),
    defaultVal: 'StandardBox1', valuesArray: _utils_1.getEnumValues(checkEditingField_1.GlyphStyle).map(function (item) { return ({
        value: item,
        displayValue: item,
        localizationId: 'DevExpress.XtraPrinting.GlyphStyle.' + item,
        templateBinding: function (templateName) { return ({ name: templateName, if: analytics_widgets_internal_1.SvgTemplatesEngine.getExistingTemplate(templateName) }); }
    }); })
};
var size = { propertyName: 'size', modelName: '@Size', from: analytics_elements_1.Size.fromString, defaultVal: glyphsInfo_1.getDefaultCheckSize().toString(), displayName: 'Size', localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphOptions.Size', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.glyphOptionsSerializationInfo = [customGlyphs, exports.glyphAlignment, size, style];
