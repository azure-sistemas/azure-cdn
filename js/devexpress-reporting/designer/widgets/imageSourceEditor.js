﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\imageSourceEditor.js)
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
var imageSource_1 = require("../../common/imageSource");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var dxImageSourceEditor = (function (_super) {
    __extends(dxImageSourceEditor, _super);
    function dxImageSourceEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    dxImageSourceEditor.prototype.updateOptions = function (options) {
        options.placeholderId = options.placeholderId || 'Image';
        _super.prototype.updateOptions.call(this, options);
    };
    dxImageSourceEditor.prototype._toggleReadOnlyState = function () {
        analytics_internal_1._getSuper(this)['_toggleReadOnlyState'].apply(this);
        this['_input']().prop('readOnly', true);
    };
    dxImageSourceEditor.prototype._handleResult = function (result) {
        var format = result.format.toLowerCase();
        if (format !== 'svg' && format !== 'png' && format !== 'jpg' && format !== 'jpeg')
            format = 'img';
        this.option('value', new imageSource_1.ImageSource(format, result.content));
    };
    return dxImageSourceEditor;
}(analytics_widgets_internal_1.dxFileImagePicker));
exports.dxImageSourceEditor = dxImageSourceEditor;
analytics_internal_1._registerDxtComponent('dxImageSourceEditor', dxImageSourceEditor);
