﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\metadata.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../../common/exportOptions/metadata");
var ko = require("knockout");
var $ = require("jquery");
exports.rtfExportModeMergedPreview = $.extend({}, metadata_1.rtfExportMode, {
    valuesArray: metadata_1.getExportModeValues('Rtf', true, true)
});
exports.docxExportModeMergedPreview = $.extend({}, metadata_1.docxExportMode, {
    valuesArray: metadata_1.getExportModeValues('Docx', true, true)
});
function excludeModesForMergedDocuments(val) {
    return ko.observable('SingleFilePageByPage');
}
exports.excludeModesForMergedDocuments = excludeModesForMergedDocuments;
function excludeDifferentFilesMode(val) {
    return ko.observable(val === 'DifferentFiles' ? 'SingleFile' : val);
}
exports.excludeDifferentFilesMode = excludeDifferentFilesMode;
exports.htmlExportModePreviewBase = {
    propertyName: metadata_1.htmlExportMode.propertyName, modelName: metadata_1.htmlExportMode.modelName, defaultVal: metadata_1.htmlExportMode.defaultVal,
    editor: metadata_1.htmlExportMode.editor, displayName: metadata_1.htmlExportMode.displayName, localizationId: metadata_1.htmlExportMode.localizationId
};
exports.htmlExportModePreview = $.extend({}, exports.htmlExportModePreviewBase, {
    from: excludeDifferentFilesMode,
    valuesArray: metadata_1.getExportModeValues('Html', true)
});
exports.htmlExportModeMergedPreview = $.extend({}, exports.htmlExportModePreviewBase, {
    valuesArray: metadata_1.getExportModeValues('Html', true, true)
});
exports.xlsExportModePreviewBase = {
    propertyName: metadata_1.xlsExportMode.propertyName, modelName: metadata_1.xlsExportMode.modelName, defaultVal: metadata_1.xlsExportMode.defaultVal,
    editor: metadata_1.xlsExportMode.editor, displayName: metadata_1.xlsExportMode.displayName, localizationId: metadata_1.xlsExportMode.localizationId
};
exports.xlsExportModePreview = $.extend({}, exports.xlsExportModePreviewBase, {
    from: excludeDifferentFilesMode,
    valuesArray: metadata_1.getExportModeValues('Xls', true)
});
exports.xlsExportModeMergedPreview = $.extend({}, exports.xlsExportModePreviewBase, {
    valuesArray: metadata_1.getExportModeValues('Xls', true, true)
});
exports.imageExportModePreviewBase = {
    propertyName: metadata_1.imageExportMode.propertyName, modelName: metadata_1.imageExportMode.modelName, defaultVal: metadata_1.imageExportMode.defaultVal,
    editor: metadata_1.imageExportMode.editor, displayName: metadata_1.imageExportMode.displayName, localizationId: metadata_1.imageExportMode.localizationId
};
exports.imageExportModePreview = $.extend({}, exports.imageExportModePreviewBase, {
    from: excludeDifferentFilesMode,
    valuesArray: metadata_1.getExportModeValues('Image', true)
});
exports.imageExportModeMergedPreview = $.extend({}, exports.imageExportModePreviewBase, {
    valuesArray: metadata_1.getExportModeValues('Image', true, true)
});
exports.xlsxExportModePreviewBase = {
    propertyName: metadata_1.xlsxExportMode.propertyName, modelName: metadata_1.xlsxExportMode.modelName, defaultVal: metadata_1.xlsxExportMode.defaultVal,
    editor: metadata_1.xlsxExportMode.editor, displayName: metadata_1.xlsxExportMode.displayName, localizationId: metadata_1.xlsxExportMode.localizationId
};
exports.xlsxExportModePreview = $.extend({}, exports.xlsxExportModePreviewBase, {
    from: excludeDifferentFilesMode,
    valuesArray: metadata_1.getExportModeValues('Xlsx', true)
});
exports.xlsxExportModeMergedPreview = $.extend({}, exports.xlsxExportModePreviewBase, {
    valuesArray: metadata_1.getExportModeValues('Xlsx', true, true)
});
