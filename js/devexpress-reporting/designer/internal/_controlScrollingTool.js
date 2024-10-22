﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_controlScrollingTool.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ControlScrollingTool = (function (_super) {
    __extends(ControlScrollingTool, _super);
    function ControlScrollingTool(_rootElement) {
        var _this = _super.call(this) || this;
        _this._rootElement = _rootElement;
        return _this;
    }
    ControlScrollingTool.prototype.scrollToControl = function (surface) {
        if (this._viewport == null) {
            this._viewport = this._rootElement.getElementsByClassName('dxrd-viewport')[0];
        }
        if (surface['absolutePosition']) {
            var currentPosition = surface['absolutePosition'];
            var scrollLeft = this._getScrollOffset(currentPosition.x(), this._viewport.scrollLeft, this._viewport.clientWidth, this._viewport.scrollWidth);
            var scrollTop = this._getScrollOffset(currentPosition.y(), this._viewport.scrollTop, this._viewport.clientHeight, this._viewport.scrollHeight);
            if (this._viewport.scrollTo) {
                this._viewport.scrollTo({
                    left: scrollLeft,
                    top: scrollTop
                });
            }
            else {
                this._viewport.scrollLeft = scrollLeft;
                this._viewport.scrollTop = scrollTop;
            }
        }
    };
    ControlScrollingTool.prototype._getScrollOffset = function (elementPosition, scrollOffset, visibleSize, fullSize) {
        var newOffset = scrollOffset;
        if (elementPosition < scrollOffset || elementPosition > (scrollOffset + visibleSize) / 2) {
            newOffset = elementPosition;
            if (newOffset + visibleSize / 2 < fullSize) {
                newOffset -= visibleSize / 2;
            }
        }
        return newOffset;
    };
    ControlScrollingTool.prototype.dispose = function () {
        this._viewport = null;
        this._rootElement = null;
    };
    return ControlScrollingTool;
}(analytics_utils_1.Disposable));
exports.ControlScrollingTool = ControlScrollingTool;
