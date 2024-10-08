﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrRichText.js)
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
var xrControl_1 = require("./xrControl");
var richEdit_1 = require("./richEdit");
var _reportRenderingService_1 = require("../services/_reportRenderingService");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var XRRichTextStreamType;
(function (XRRichTextStreamType) {
    XRRichTextStreamType[XRRichTextStreamType["RtfText"] = 0] = "RtfText";
    XRRichTextStreamType[XRRichTextStreamType["PlainText"] = 1] = "PlainText";
    XRRichTextStreamType[XRRichTextStreamType["HtmlText"] = 2] = "HtmlText";
    XRRichTextStreamType[XRRichTextStreamType["XmlText"] = 3] = "XmlText";
})(XRRichTextStreamType = exports.XRRichTextStreamType || (exports.XRRichTextStreamType = {}));
var XRRichViewModel = (function (_super) {
    __extends(XRRichViewModel, _super);
    function XRRichViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.format = ko.observable(XRRichTextStreamType.RtfText);
        _this._newDocumentData = ko.observable(null);
        _this.textRtf = ko.observable('');
        _this._rtf = ko.observable('');
        var nameSubscribe = ko.computed(function () {
            var newVal = _this.name();
            if (!_this.textRtf() && newVal) {
                _this.textRtf(newVal);
                nameSubscribe && nameSubscribe.dispose();
            }
        }).extend({ rateLimit: { method: 'notifyWhenChangesStop', timeout: 1 } });
        _this._disposables.push(_this._newDocumentData.subscribe(function (newVal) {
            if (newVal)
                _this.format(_this._toStreamType(newVal.format));
            else
                _this.format(XRRichTextStreamType.RtfText);
        }));
        _this._disposables.push(nameSubscribe);
        return _this;
    }
    XRRichViewModel.prototype._toStreamType = function (extension) {
        switch (extension.toLowerCase()) {
            case 'txt':
                return XRRichTextStreamType.PlainText;
            case 'htm':
            case 'html':
                return XRRichTextStreamType.HtmlText;
            case 'docx':
                return XRRichTextStreamType.XmlText;
        }
        return XRRichTextStreamType.RtfText;
    };
    XRRichViewModel.prototype.getInfo = function () {
        var serializationInfo = $.extend(true, [], _super.prototype.getInfo.call(this));
        if (!(richEdit_1.getRichEditSurface()() instanceof XRRichSurface)) {
            serializationInfo.filter(function (x) { return XRRichViewModel._hiddenProperties.some(function (propertyName) { return propertyName === x.propertyName; }); })
                .forEach(function (x) { return x.visible = false; });
        }
        return serializationInfo;
    };
    Object.defineProperty(XRRichViewModel.prototype, "textEditableProperty", {
        get: function () { return this.textRtf; },
        enumerable: true,
        configurable: true
    });
    XRRichViewModel._hiddenProperties = ['_rtf', 'textRtf'];
    return XRRichViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRRichViewModel = XRRichViewModel;
var XRRichSurface = (function (_super) {
    __extends(XRRichSurface, _super);
    function XRRichSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this._lastRequest = ko.observable(null);
        _this._innerUpdate = ko.observable(false);
        _this.imageSrc = ko.observable('');
        _this.isLoading = ko.observable(false);
        _this.template = 'dxrd-shape';
        _this.contenttemplate = 'dxrd-shape-content';
        _this._sendCallback();
        _this._disposables.push(control._newDocumentData.subscribe(function (newVal) {
            control.serializableRtfString(newVal && newVal.content);
        }));
        _this._disposables.push(control.textRtf.subscribe(function (newVal) { _this._sendCallback('textRtf'); }));
        _this._disposables.push(control._rtf.subscribe(function () { _this._sendCallback('rtf'); }));
        _this._disposables.push(control.font.subscribe(function () { _this._sendCallback('font'); }));
        _this._disposables.push(control.foreColor.subscribe(function () { _this._sendCallback('foreColor'); }));
        _this._disposables.push(_this['position']['width'].subscribe(function (newValue) { _this._sendCallback('width'); }));
        _this._disposables.push(_this['position']['height'].subscribe(function (newValue) { _this._sendCallback('height'); }));
        _this._disposables.push(control.serializableRtfString.subscribe(function (newVal) { _this._sendCallback(newVal ? 'base64rtf' : undefined); }));
        return _this;
    }
    XRRichSurface.prototype._sendCallback = function (propertyName) {
        if (propertyName === void 0) { propertyName = null; }
        if (!this._innerUpdate()) {
            this._lastRequest(propertyName);
            var self = this;
            var selfControl = this._control;
            this.isLoading(true);
            _reportRenderingService_1.ReportRenderingService.getRichImage(this, propertyName).done(function (result) {
                self.isLoading(false);
                if (propertyName === self._lastRequest()) {
                    selfControl.root && selfControl.root['_update'] && selfControl.root['_update'](true);
                    if (propertyName !== 'height' && propertyName !== 'width') {
                        self._innerUpdate(true);
                        if (propertyName !== 'textRtf') {
                            selfControl.textRtf(result.Text);
                        }
                        selfControl._rtf(result.Rtf);
                        selfControl.serializableRtfString(result.SerializableRtfString);
                        self._innerUpdate(false);
                    }
                    self.imageSrc('data:image/x;base64,' + result.Img);
                    selfControl.root && selfControl.root['_update'] && selfControl.root['_update'](false);
                }
            }).fail(function (jqXHR) {
                self.isLoading(false);
                analytics_internal_1.NotifyAboutWarning('It is impossible to get richText');
            });
        }
    };
    return XRRichSurface;
}(xrControl_1.XRControlSurface));
exports.XRRichSurface = XRRichSurface;
