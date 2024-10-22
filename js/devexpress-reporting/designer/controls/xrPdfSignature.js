﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPdfSignature.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrControl_1 = require("./xrControl");
var XRPdfSignatureModel = (function (_super) {
    __extends(XRPdfSignatureModel, _super);
    function XRPdfSignatureModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._displayDocumentSignatureSubscribed = false;
        return _this;
    }
    XRPdfSignatureModel.prototype.subscribeSignature = function (allControls) {
        var _this = this;
        if (!this._displayDocumentSignatureSubscribed) {
            this._displayDocumentSignatureSubscribed = true;
            this._disposables.push(this.signatureOptions.displayDocumentSignature.subscribe(function (newVal) {
                if (newVal) {
                    var control = analytics_internal_1.findFirstItemMatchesCondition(allControls(), function (item) { return _this !== item && item.signatureOptions.displayDocumentSignature(); });
                    control && control.signatureOptions.displayDocumentSignature(false);
                }
            }));
        }
    };
    return XRPdfSignatureModel;
}(xrControl_1.XRControlViewModel));
exports.XRPdfSignatureModel = XRPdfSignatureModel;
var XRPdfSignatureSurface = (function (_super) {
    __extends(XRPdfSignatureSurface, _super);
    function XRPdfSignatureSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.contenttemplate = 'dxrd-pdfsignature-content';
        _this['multiline'] = true;
        _this.displayText = function () {
            if (control.signatureOptions.displayDocumentSignature())
                return _this.getSignatureInformationString(control);
            else
                return analytics_utils_1.getLocalization('Digital Signature', 'PreviewStringId.SignatureUnsignedCaption');
        };
        _this._disposables.push(_this.showSkeleton = ko.computed(function () {
            return !control.signatureOptions.displayDocumentSignature();
        }), _this.visibleImage = ko.computed(function () {
            return control.signatureOptions.imageDisplayMode() == 'Show';
        }), _this.hideImage = ko.computed(function () {
            return control.signatureOptions.imageDisplayMode() == 'Hide';
        }), _this.visibleText = ko.computed(function () {
            return control.signatureOptions.showCertificateName() ||
                control.signatureOptions.showDistinguishedName() ||
                control.signatureOptions.showLocation() ||
                control.signatureOptions.showSignatureDate() ||
                control.signatureOptions.showSignatureReason();
        }));
        return _this;
    }
    XRPdfSignatureSurface.prototype.getSignatureInformationString = function (control) {
        var viewInfo = {
            certificateName: this.certificateName,
            distinguishedName: analytics_utils_1.getLocalization('your distinguished name here', 'PreviewStringId.SignatureFillerText_DistinguishedName'),
            reason: analytics_utils_1.getLocalization('your signing reason here', 'PreviewStringId.SignatureFillerText_Reason'),
            location: analytics_utils_1.getLocalization('your signing location here', 'PreviewStringId.SignatureFillerText_Location'),
            dateString: new Date(new Date().setHours(0, 0, 0, 0)).toLocaleString()
        };
        var parts = [];
        var showCaptions = control.signatureOptions.showCaptions();
        if (control.signatureOptions.showCertificateName())
            parts.push((showCaptions ? analytics_utils_1.getLocalization('Digitally signed by', 'PreviewStringId.SignatureCaptions_CertificateName') + ' ' : '') + viewInfo.certificateName);
        if (control.signatureOptions.showDistinguishedName())
            parts.push((showCaptions ? analytics_utils_1.getLocalization('DN:', 'PreviewStringId.SignatureCaptions_DistinguishedName') + ' ' : '') + viewInfo.distinguishedName);
        if (control.signatureOptions.showSignatureReason())
            parts.push((showCaptions ? analytics_utils_1.getLocalization('Reason:', 'PreviewStringId.SignatureCaptions_Reason') + ' ' : '') + viewInfo.reason);
        if (control.signatureOptions.showLocation())
            parts.push((showCaptions ? analytics_utils_1.getLocalization('Location:', 'PreviewStringId.SignatureCaptions_Location') + ' ' : '') + viewInfo.location);
        if (control.signatureOptions.showSignatureDate())
            parts.push((showCaptions ? analytics_utils_1.getLocalization('Date:', 'PreviewStringId.SignatureCaptions_Date') + ' ' : '') + viewInfo.dateString);
        return parts.join('\r\n');
    };
    Object.defineProperty(XRPdfSignatureSurface.prototype, "certificateName", {
        get: function () {
            return analytics_utils_1.getLocalization('your common name here', 'PreviewStringId.SignatureFillerText_CertificateName');
        },
        enumerable: true,
        configurable: true
    });
    return XRPdfSignatureSurface;
}(xrControl_1.XRControlSurface));
exports.XRPdfSignatureSurface = XRPdfSignatureSurface;
