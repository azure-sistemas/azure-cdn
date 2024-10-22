﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPicturebox.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imageSource_1 = require("../../../common/imageSource");
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
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.imageUrl = { propertyName: 'imageUrl', modelName: '@ImageUrl', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '', displayName: 'Image Url', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl' };
exports.imageSource = {
    propertyName: 'imageSource',
    modelName: '@ImageSource',
    editor: { header: 'dxrd-image-loadfile', editorType: analytics_widgets_1.Editor },
    displayName: 'Image Source',
    localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageSource',
    from: function (val) { return ko.observable(imageSource_1.ImageSource.parse(val)); },
    toJsonObject: imageSource_1.ImageSource.toString,
    defaultVal: null
};
exports.sizing = {
    propertyName: 'sizing', modelName: '@Sizing', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Sizing', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.Sizing', defaultVal: 'Normal', from: analytics_utils_1.fromEnum, valuesArray: [
        { value: 'Normal', displayValue: 'Normal', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Normal' },
        { value: 'StretchImage', displayValue: 'Stretch Image', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.StretchImage' },
        { value: 'AutoSize', displayValue: 'Auto-Size', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.AutoSize' },
        { value: 'CenterImage', displayValue: 'Center Image', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.CenterImage' },
        { value: 'ZoomImage', displayValue: 'Zoom Image', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.ZoomImage' },
        { value: 'Squeeze', displayValue: 'Squeeze', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Squeeze' },
        { value: 'Tile', displayValue: 'Tile', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Tile' },
        { value: 'Cover', displayValue: 'Cover', localizationId: 'DevExpress.XtraPrinting.ImageSizeMode.Cover' }
    ]
};
exports.imageAlignment = {
    propertyName: 'imageAlignment', modelName: '@ImageAlignment', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Alignment', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.Alignment', defaultVal: 'Default', from: analytics_utils_1.fromEnum, valuesArray: [
        { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.Default' },
        { value: 'TopLeft', displayValue: 'Top Left', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.TopLeft' },
        { value: 'TopCenter', displayValue: 'Top Center', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.TopCenter' },
        { value: 'TopRight', displayValue: 'Top Right', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.TopRight' },
        { value: 'MiddleLeft', displayValue: 'Middle Left', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.MiddleLeft' },
        { value: 'MiddleCenter', displayValue: 'Middle Center', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.MiddleCenter' },
        { value: 'MiddleRight', displayValue: 'Middle Right', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.MiddleRight' },
        { value: 'BottomLeft', displayValue: 'Bottom Left', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.BottomLeft' },
        { value: 'BottomCenter', displayValue: 'Bottom Center', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.BottomCenter' },
        { value: 'BottomRight', displayValue: 'Bottom Right', localizationId: 'DevExpress.XtraPrinting.ImageAlignment.BottomRight' }
    ]
};
exports.imageEditOptions = analytics_internal_1.extend({}, editOptions_1.editOptions, {
    propertyName: 'imageEditOptions',
    from: function (model, serializer) { return new editOptions_2.ImageEditOptions(model, serializer); }
});
exports.pictureBoxSerializationsInfo = [
    exports.imageUrl, exports.imageSource, exports.sizing, exports.imageAlignment, metadata_1.keepTogether, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.controlScripts,
    dataBinding_1.dataBindings(['Bookmark', 'Image', 'ImageSource', 'ImageUrl', 'NavigateUrl', 'Tag']),
    exports.imageEditOptions
].concat(_metaUtils_1.createPopularBindingInfos({ propertyName: 'ImageUrl', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl' }), _metaUtils_1.createPopularBindingInfos({ propertyName: 'ImageSource', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageSource' }), metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.navigationGroup, metadataGroups_1.processGroup);
exports.popularPropertiesPicture = ['imageSource', 'popularDataBindingImageSource', 'imageUrl', 'popularDataBindingImageUrl', 'sizing', 'imageAlignment', 'bookmark', 'bookmarkParent'];
