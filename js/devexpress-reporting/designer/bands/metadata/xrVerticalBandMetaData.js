﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrVerticalBandMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../../controls/metadata/properties/metadata");
var xrBandMetaData_1 = require("./xrBandMetaData");
var bandsMetadata_1 = require("./bandsMetadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var width = { propertyName: 'width', modelName: '@WidthF', defaultVal: 300, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', from: analytics_utils_1.floatFromModel, localizable: true };
exports.commonVerticalBandProperties = [width, metadata_1.keepTogetherDefaultValueFalse].concat(xrBandMetaData_1.bandSerializationInfo);
exports.bandLayout = {
    propertyName: 'bandLayout',
    modelName: '@BandLayout',
    displayName: 'Band Layout',
    localizationId: 'DevExpress.XtraReports.UI.VerticalDetailBand.BandLayout',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'AcrossOnly', displayValue: 'Across Only', localizationId: 'DevExpress.XtraReports.UI.VerticalBandLayout.AcrossOnly' },
        { value: 'AcrossThenDown', displayValue: 'Across Then Down', localizationId: 'DevExpress.XtraReports.UI.VerticalBandLayout.AcrossThenDown' }
    ],
    defaultVal: 'AcrossOnly'
};
exports.verticalHeaderBandSerializationInfo = [bandsMetadata_1.repeatEveryPage].concat(exports.commonVerticalBandProperties);
exports.popularPropertiesVerticalHeaderBand = ['repeatEveryPage'];
exports.verticalTotalBandSerializationInfo = [].concat(exports.commonVerticalBandProperties);
exports.popularPropertiesVerticalTotalBand = [];
