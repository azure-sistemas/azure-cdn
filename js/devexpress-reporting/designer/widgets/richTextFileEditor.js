﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\richTextFileEditor.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var dxRichTextFileEditor = (function (_super) {
    __extends(dxRichTextFileEditor, _super);
    function dxRichTextFileEditor(element, options) {
        return _super.call(this, element, options) || this;
    }
    dxRichTextFileEditor.prototype._handleResult = function (result) {
        this.option('value', result);
    };
    return dxRichTextFileEditor;
}(analytics_widgets_internal_1.dxFileImagePicker));
exports.dxRichTextFileEditor = dxRichTextFileEditor;
analytics_internal_1._registerDxtComponent('dxRichTextFileEditor', dxRichTextFileEditor);
