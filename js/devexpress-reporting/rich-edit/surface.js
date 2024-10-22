﻿/**
* DevExpress HTML/JS Reporting (rich-edit\surface.js)
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
var $ = require("jquery");
var _controller_1 = require("./utils/_controller");
var utils_1 = require("../designer/utils/utils");
var xrControl_1 = require("../designer/controls/xrControl");
var XRRichModernSurface = (function (_super) {
    __extends(XRRichModernSurface, _super);
    function XRRichModernSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.isValid = ko.observable(true);
        _this.serializedRtf = ko.observable('');
        _this.template = 'dxrd-richedit';
        _this.contenttemplate = 'dxrd-richedit-content';
        _this.selectiontemplate = 'dxrd-richedit-selection';
        _this._convertReady = $.Deferred();
        utils_1.base64UTF16LEtobase64UTF8(control.serializableRtfString(), function (val) {
            _this.serializedRtf(val);
            _this._convertReady.resolve(true);
        });
        _this._disposables.push(_this.serializedRtf.subscribe(function (newValue) {
            control.serializableRtfString(newValue);
        }));
        _this.defaultStyleunit = ko.computed(function () { return ({
            top: _this.contentSizes().top + (_this.isIntersect() ? 1 : 0),
            left: _this.contentSizes().left + (_this.isIntersect() ? 1 : 0),
            lineHeight: _this.contentSizes().height,
            height: _this.contentSizes().height,
            width: _this.contentSizes().width
        }); }).extend({ deferred: true });
        _this._disposables.push(_this.defaultStyleunit);
        return _this;
    }
    XRRichModernSurface.prototype.createController = function (richEdit) {
        var _this = this;
        this._convertReady.done(function () {
            _this.controller = new _controller_1.XRRichController(richEdit, _this);
            _this._disposables.push(_this.controller);
        });
    };
    return XRRichModernSurface;
}(xrControl_1.XRControlSurface));
exports.XRRichModernSurface = XRRichModernSurface;
