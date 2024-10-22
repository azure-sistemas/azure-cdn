﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_textElementSizeHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var TextElementSizeHelper = (function () {
    function TextElementSizeHelper() {
        this._spaceSymbol = '&nbsp';
    }
    TextElementSizeHelper.prototype._$createElement = function (options, processElement) {
        return processElement($('<div>').css(options)).appendTo($('body'));
    };
    TextElementSizeHelper.prototype.$createTextElement = function (text, options) {
        return this._$createElement(options, function ($element) { return $element.text(text); });
    };
    TextElementSizeHelper.prototype.$createSpaceElement = function (options) {
        var _this = this;
        return this._$createElement(options, function ($element) { return $element.html(_this._spaceSymbol); });
    };
    TextElementSizeHelper.prototype.getTextContainerSize = function (text, options, increaseHeight) {
        if (increaseHeight === void 0) { increaseHeight = 2; }
        var $div = text !== this._spaceSymbol ? this.$createTextElement(text, options) : this.$createSpaceElement(options);
        $div.height($div.height() + increaseHeight);
        var rect = $div[0].getBoundingClientRect();
        var height = Math.ceil(rect.height);
        var width = Math.ceil(rect.width);
        $div.remove();
        return { width: width, height: height };
    };
    return TextElementSizeHelper;
}());
exports.TextElementSizeHelper = TextElementSizeHelper;
