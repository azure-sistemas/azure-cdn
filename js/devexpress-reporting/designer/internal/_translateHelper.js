﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_translateHelper.js)
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
var types_1 = require("../../common/types");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var TranslateHelper = (function (_super) {
    __extends(TranslateHelper, _super);
    function TranslateHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._maxInterval = 1000;
        _this._restoreDictionary = {};
        _this._timeouts = {};
        return _this;
    }
    TranslateHelper.prototype._getElement = function (name) {
        return $('.dx-designer .' + name)[0];
    };
    TranslateHelper.prototype.dispose = function () {
        types_1.convertMapToKeyValuePair(this._timeouts).forEach(function (item) { return clearTimeout(item.Value); });
        _super.prototype.dispose.call(this);
    };
    TranslateHelper.prototype.move = function (elementClassName, sign, transform, transition) {
        var _this = this;
        if (sign === void 0) { sign = '-'; }
        if (transform === void 0) { transform = 'translateY'; }
        if (transition === void 0) { transition = '0.35s transform ease-in-out'; }
        clearTimeout(this._timeouts[elementClassName]);
        var element = this._getElement(elementClassName);
        if (element) {
            var result = transform === 'translateY' ? element.clientHeight : element.clientWidth;
            var _transform = transform + '(' + sign + result + 'px)';
            var currentTransition = element.style.transition || 'transform 0s ease 0s';
            var currentVisible = element.style.visibility || 'visible';
            var currentTransform = element.style.transform || 'none';
            this._restoreDictionary[elementClassName] = function (element) {
                element.style.visibility = currentVisible;
                element.style.transform = currentTransform;
                element.style['-webkit-transform'] = currentTransform;
                _this._timeouts[elementClassName] = setTimeout(function () {
                    element.style.transition = currentTransition;
                }, _this._maxInterval);
            };
            element.style.transition = transition;
            element.style.transform = _transform;
            element.style['-webkit-transform'] = _transform;
            this._timeouts[elementClassName] = setTimeout(function () {
                element.style.visibility = 'hidden';
            }, this._maxInterval);
        }
    };
    TranslateHelper.prototype.reset = function (elementClassName) {
        clearTimeout(this._timeouts[elementClassName]);
        var element = this._getElement(elementClassName);
        if (element && this._restoreDictionary[elementClassName]) {
            this._restoreDictionary[elementClassName](element);
            delete this._restoreDictionary[elementClassName];
        }
    };
    return TranslateHelper;
}(analytics_utils_1.Disposable));
exports.TranslateHelper = TranslateHelper;
