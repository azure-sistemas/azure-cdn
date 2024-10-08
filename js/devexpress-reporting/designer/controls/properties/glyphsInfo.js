﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\glyphsInfo.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var imageSource_1 = require("../../../common/imageSource");
var checkEditingField_1 = require("../../../viewer/editing/models/checkEditingField");
function getDefaultCheckSize(checkState) {
    if (checkState === void 0) { checkState = checkEditingField_1.GlyphStyle.StandardBox1; }
    if (checkState === checkEditingField_1.GlyphStyle.StandardBox1)
        return new analytics_elements_1.Size(13, 13);
    else
        return new analytics_elements_1.Size(16, 16);
}
exports.getDefaultCheckSize = getDefaultCheckSize;
function _getCustomGlyphsInfo(type) {
    return {
        propertyName: type,
        modelName: '@' + type,
        editor: { header: 'dxrd-image-loadfile', editorType: analytics_widgets_1.Editor },
        displayName: type,
        localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphs.' + type,
        from: function (val) { return ko.observable(imageSource_1.ImageSource.parse(val)); },
        toJsonObject: imageSource_1.ImageSource.toString,
        defaultVal: null
    };
}
exports._getCustomGlyphsInfo = _getCustomGlyphsInfo;
