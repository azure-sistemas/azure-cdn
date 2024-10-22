﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPdfSignature.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("./properties/metadata");
var metadataGroups_1 = require("./properties/metadataGroups");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var showSignatureDate = {
    propertyName: 'showSignatureDate', modelName: '@ShowSignatureDate', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Show Signature Date', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowSignatureDate',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var showCertificateName = {
    propertyName: 'showCertificateName', modelName: '@ShowCertificateName', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Show Certificate Name', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowCertificateName',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var showLocation = {
    propertyName: 'showLocation', modelName: '@ShowLocation', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Show Location', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowLocation',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var showSignatureReason = {
    propertyName: 'showSignatureReason', modelName: '@ShowSignatureReason', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Show Signature Reason', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowSignatureReason',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var showDistinguishedName = {
    propertyName: 'showDistinguishedName', modelName: '@ShowDistinguishedName', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Show Distinguished Name', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowDistinguishedName',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var showCaptions = {
    propertyName: 'showCaptions', modelName: '@ShowCaptions', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Show Captions', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowCaptions',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var displayDocumentSignature = {
    propertyName: 'displayDocumentSignature', modelName: '@DisplayDocumentSignature', defaultVal: 'true', from: analytics_utils_1.parseBool,
    displayName: 'Display Document Signature', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.DisplayDocumentSignature',
    editor: analytics_widgets_1.editorTemplates.getEditor('bool')
};
var imageDisplayMode = {
    propertyName: 'imageDisplayMode', modelName: '@ImageDisplayMode', defaultVal: 'Show',
    displayName: 'Image Display Mode', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ImageDisplayMode',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
        { displayValue: 'Show', localizationId: 'DevExpress.XtraPrinting.SignatureImageDisplayMode.Show', value: 'Show' },
        { displayValue: 'Hide', localizationId: 'DevExpress.XtraPrinting.SignatureImageDisplayMode.Hide', value: 'Hide' },
        { displayValue: 'Show Certificate Name As Image', localizationId: 'DevExpress.XtraPrinting.SignatureImageDisplayMode.ShowCertificateNameAsImage', value: 'ShowCertificateNameAsImage' }
    ]
};
var signatureOptionsInfo = [
    imageDisplayMode, displayDocumentSignature, showCaptions, showCertificateName, showDistinguishedName, showLocation, showSignatureDate, showSignatureReason
];
exports.signatureOptions = {
    propertyName: 'signatureOptions', modelName: 'SignatureOptions', visible: false,
    displayName: 'Signature Options', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.SignatureOptions',
    editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'),
    from: function (model, serializer) {
        if (model === void 0) { model = {}; }
        if (serializer === void 0) { serializer = new analytics_utils_1.ModelSerializer(); }
        var options = {
            getInfo: function () { return signatureOptionsInfo; },
            isPropertyDisabled: function (propertyName) {
                return propertyName !== displayDocumentSignature.propertyName && !!this[displayDocumentSignature.propertyName]();
            }
        };
        serializer.deserialize(options, model);
        return options;
    },
    toJsonObject: function (value, serializer, refs) {
        return serializer.serialize(value, signatureOptionsInfo, refs);
    }
};
exports.pdfSignatureInfo = [exports.signatureOptions, scriptMetadata_1.commonScripts].concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.fontGroup, metadataGroups_1.navigationGroup).filter(function (x) { return x != metadata_1.accessibleDescription; });
