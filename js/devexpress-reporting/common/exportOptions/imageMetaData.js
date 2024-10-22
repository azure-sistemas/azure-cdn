﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\imageMetaData.js)
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
exports.imageExportOptionsSerializationInfoBase = [
    metadata_1.pageBorderColor,
    metadata_1.pageBorderWidth,
    metadata_1.pageRange,
    { propertyName: 'resolution', modelName: '@Resolution', displayName: 'Resolution', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.Resolution', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 96 },
    {
        propertyName: 'format', modelName: '@Format', displayName: 'Format', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.Format', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Png', from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'Bmp', displayValue: 'BMP' },
            { value: 'Gif', displayValue: 'GIF' },
            { value: 'Jpeg', displayValue: 'JPEG' },
            { value: 'Png', displayValue: 'PNG' },
            { value: 'Emf', displayValue: 'EMF' },
            { value: 'Wmf', displayValue: 'WMF' },
            { value: 'Tiff', displayValue: 'TIFF' }
        ]
    }
];
exports.imageExportOptionsSerializationInfo = [metadata_1.imageExportMode,
    { propertyName: 'retainBackgroundTransparency', modelName: '@RetainBackgroundTransparency', displayName: 'Retain Background Transparency', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.RetainBackgroundTransparency', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    {
        propertyName: 'textRenderingMode', modelName: '@TextRenderingMode', displayName: 'Text Rendering Mode', localizationId: 'DevExpress.XtraPrinting.ImageExportOptions.TextRenderingMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'SystemDefault', from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'SystemDefault', displayValue: 'SystemDefault', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.SystemDefault' },
            { value: 'SingleBitPerPixelGridFit', displayValue: 'SingleBitPerPixelGridFit', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixelGridFit' },
            { value: 'SingleBitPerPixel', displayValue: 'SingleBitPerPixel', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixel' },
            { value: 'AntiAliasGridFit', displayValue: 'AntiAliasGridFit', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.AntiAliasGridFit' },
            { value: 'AntiAlias', displayValue: 'AntiAlias', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.AntiAlias' },
            { value: 'ClearTypeGridFit', displayValue: 'ClearTypeGridFit', localizationId: 'DevExpress.XtraPrinting.TextRenderingMode.ClearTypeGridFit' }
        ]
    }
].concat(exports.imageExportOptionsSerializationInfoBase);
