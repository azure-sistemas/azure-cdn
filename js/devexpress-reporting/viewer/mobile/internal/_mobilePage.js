﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePage.js)
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
var _page_1 = require("../../internal/_page");
var MobilePreviewPage = (function (_super) {
    __extends(MobilePreviewPage, _super);
    function MobilePreviewPage(preview, pageIndex, processClick, loading) {
        var _this = _super.call(this, preview, pageIndex, processClick, loading) || this;
        _this.maxZoom = 1;
        _this.selectBrick = function (path, ctrlKey) {
            var currentBrick = _this.brick();
            !ctrlKey && _this.resetBrickRecusive(currentBrick);
            if (!path) {
                return;
            }
            if (!currentBrick) {
                _this['_selectedBrickPath'] = path;
                return;
            }
            _this.bricks().forEach(function (brick) { brick.indexes === path && brick.active(true); });
        };
        return _this;
    }
    return MobilePreviewPage;
}(_page_1.PreviewPage));
exports.MobilePreviewPage = MobilePreviewPage;
