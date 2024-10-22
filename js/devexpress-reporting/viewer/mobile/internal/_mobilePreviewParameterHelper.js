﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePreviewParameterHelper.js)
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
var previewParameterHelper_1 = require("../../parameters/previewParameterHelper");
var _editorTemplates_1 = require("./_editorTemplates");
var MobilePreviewParameterHelper = (function (_super) {
    __extends(MobilePreviewParameterHelper, _super);
    function MobilePreviewParameterHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewParameterHelper.prototype.getRangeEditor = function () {
        return _editorTemplates_1.editorTemplates.rangeEditor;
    };
    return MobilePreviewParameterHelper;
}(previewParameterHelper_1.PreviewParameterHelper));
exports.MobilePreviewParameterHelper = MobilePreviewParameterHelper;
