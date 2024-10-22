﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrPageBand.js)
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
var xrBand_1 = require("./xrBand");
var PageFooterSurface = (function (_super) {
    __extends(PageFooterSurface, _super);
    function PageFooterSurface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageFooterSurface.prototype.getBackgroundRect = function () {
        var top = 0, bottom, height = this._height();
        top = this.parent.pageHeight() - this._totalHeight() - this.parent.margins.bottom();
        return { top: top, bottom: bottom, height: height };
    };
    return PageFooterSurface;
}(xrBand_1.BandSurface));
exports.PageFooterSurface = PageFooterSurface;
