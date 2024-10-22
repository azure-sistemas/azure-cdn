﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\watermark.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var xrPicturebox_1 = require("../xrPicturebox");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.foreColorWatermark = analytics_internal_1.extend({}, metadata_1.foreColor, { defaultVal: 'Red' });
exports.fontWatermark = analytics_internal_1.extend({}, metadata_1.font, { defaultVal: 'Verdana, 36pt' });
exports.watermarkSerializationsInfo = [
    exports.fontWatermark, exports.foreColorWatermark,
    { propertyName: 'textTransparency', modelName: '@TextTransparency', displayName: 'Text Transparency', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.TextTransparency', defaultVal: 50, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    {
        propertyName: 'text', modelName: '@Text', displayName: 'Text', localizable: true, localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.Text', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('comboboxEditable'),
        valuesArray: [{ value: 'ASAP', displayValue: 'ASAP', localizationId: 'PreviewStringId.WMForm_Watermark_Asap' }, { value: 'CONFIDENTIAL', displayValue: 'CONFIDENTIAL', localizationId: 'PreviewStringId.WMForm_Watermark_Confidential' }, { value: 'COPY', displayValue: 'COPY', localizationId: 'PreviewStringId.WMForm_Watermark_Copy' }, { value: 'DO NOT COPY', displayValue: 'DO NOT COPY', localizationId: 'PreviewStringId.WMForm_Watermark_DoNotCopy' }, { value: 'DRAFT', displayValue: 'DRAFT', localizationId: 'PreviewStringId.WMForm_Watermark_Draft' }, { value: 'EVALUATION', displayValue: 'EVALUATION', localizationId: 'PreviewStringId.WMForm_Watermark_Evaluation' }, { value: 'ORIGINAL', displayValue: 'ORIGINAL', localizationId: 'PreviewStringId.WMForm_Watermark_Original' }, { value: 'PERSONAL', displayValue: 'PERSONAL', localizationId: 'PreviewStringId.WMForm_Watermark_Personal' }, { value: 'SAMPLE', displayValue: 'SAMPLE', localizationId: 'PreviewStringId.WMForm_Watermark_Sample' }, { value: 'TOP SECRET', displayValue: 'TOP SECRET', localizationId: 'PreviewStringId.WMForm_Watermark_TopSecret' }, { value: 'URGENT', displayValue: 'URGENT', localizationId: 'PreviewStringId.WMForm_Watermark_Urgent' }]
    },
    {
        propertyName: 'textDirection', modelName: '@TextDirection', displayName: 'Text Direction', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.TextDirection', defaultVal: 'ForwardDiagonal', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'Horizontal', displayValue: 'Horizontal', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.Horizontal' },
            { value: 'ForwardDiagonal', displayValue: 'ForwardDiagonal', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.ForwardDiagonal' },
            { value: 'BackwardDiagonal', displayValue: 'BackwardDiagonal', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.BackwardDiagonal' },
            { value: 'Vertical', displayValue: 'Vertical', localizationId: 'DevExpress.XtraPrinting.Drawing.DirectionMode.Vertical' }
        ]
    },
    xrPicturebox_1.imageSource,
    { propertyName: 'imageTransparency', modelName: '@ImageTransparency', displayName: 'Image Transparency', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageTransparency', defaultVal: 0, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    { propertyName: 'imageTiling', modelName: '@ImageTiling', displayName: 'Image Tiling', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageTiling', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    {
        propertyName: 'imageAlign', modelName: '@ImageAlign', displayName: 'Image Alignment', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageAlign', defaultVal: 'MiddleCenter', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'TopLeft', displayValue: 'TopLeft', localizationId: 'System.Drawing.ContentAlignment.TopLeft' },
            { value: 'TopCenter', displayValue: 'TopCenter', localizationId: 'System.Drawing.ContentAlignment.TopCenter' },
            { value: 'TopRight', displayValue: 'TopRight', localizationId: 'System.Drawing.ContentAlignment.TopRight' },
            { value: 'MiddleLeft', displayValue: 'MiddleLeft', localizationId: 'System.Drawing.ContentAlignment.MiddleLeft' },
            { value: 'MiddleCenter', displayValue: 'MiddleCenter', localizationId: 'System.Drawing.ContentAlignment.MiddleCenter' },
            { value: 'MiddleRight', displayValue: 'MiddleRight', localizationId: 'System.Drawing.ContentAlignment.MiddleRight' },
            { value: 'BottomLeft', displayValue: 'BottomLeft', localizationId: 'System.Drawing.ContentAlignment.BottomLeft' },
            { value: 'BottomCenter', displayValue: 'BottomCenter', localizationId: 'System.Drawing.ContentAlignment.BottomCenter' },
            { value: 'BottomRight', displayValue: 'BottomRight', localizationId: 'System.Drawing.ContentAlignment.BottomRight' }
        ]
    },
    {
        propertyName: 'imageViewMode', modelName: '@ImageViewMode', displayName: 'Image View Mode', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageViewMode', defaultVal: 'Clip', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'Clip', displayValue: 'Clip', localizationId: 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Clip' },
            { value: 'Stretch', displayValue: 'Stretch', localizationId: 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Stretch' },
            { value: 'Zoom', displayValue: 'Zoom', localizationId: 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Zoom' }
        ]
    },
    { propertyName: 'pageRange', modelName: '@PageRange', displayName: 'Page Range', localizationId: 'DevExpress.XtraPrinting.Drawing.Watermark.PageRange', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'showBehind', modelName: '@ShowBehind', defaultVal: true, from: analytics_utils_1.parseBool, displayName: 'Show Behind', localizationId: 'DevExpress.XtraPrinting.Drawing.PageWatermark.ShowBehind', editor: analytics_widgets_1.editorTemplates.getEditor('bool') }
];
