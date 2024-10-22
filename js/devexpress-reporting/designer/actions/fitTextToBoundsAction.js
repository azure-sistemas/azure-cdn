﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitTextToBoundsAction.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _textElementSizeHelper_1 = require("../helpers/_textElementSizeHelper");
var FitTextToBoundsAction = (function () {
    function FitTextToBoundsAction(_control, textElementHelper) {
        if (textElementHelper === void 0) { textElementHelper = new _textElementSizeHelper_1.TextElementSizeHelper(); }
        this._control = _control;
        this.textElementHelper = textElementHelper;
    }
    FitTextToBoundsAction.prototype._getTextSide = function ($div, fontProperties, controlSize, getSide) {
        var currentSide = getSide($div);
        var sizeFounded = false;
        var inc = controlSize / currentSide;
        var currentFontSize = Math.ceil(fontProperties.size * inc);
        while (!sizeFounded) {
            $div.css({ 'font-size': currentFontSize + fontProperties.unit });
            if (getSide($div) > controlSize) {
                currentFontSize -= 1;
            }
            else {
                sizeFounded = true;
            }
        }
        return currentFontSize;
    };
    FitTextToBoundsAction.prototype._calculateFont = function ($div, fontProperties, maxHeight) {
        var sizeFounded = false;
        var font = fontProperties.size;
        var height = $div[0].getBoundingClientRect().height;
        if (height === maxHeight)
            return font;
        var inc = height > maxHeight ? -1 : 1;
        while (!sizeFounded) {
            font += inc;
            $div.css({ 'font-size': font + fontProperties.unit });
            var height = $div[0].getBoundingClientRect().height;
            if (height < maxHeight && inc === -1) {
                sizeFounded = true;
            }
            else if (inc === 1 && height > maxHeight) {
                font -= inc;
                sizeFounded = true;
            }
        }
        return font;
    };
    FitTextToBoundsAction.prototype._getAvailableFont = function () {
        var fontModel = this._control.getFontModel();
        var containerSize = this._control.getContentSize();
        var zoom = this._control._context.zoom();
        var font = fontModel.size();
        if (!this._control.getWordWrap()) {
            var $div = this.textElementHelper.$createTextElement(this._control.getText(), this._control.getCssContent());
            var fontByHeight = this._getTextSide($div, { size: font, unit: fontModel.unit() }, containerSize.height, function ($div) { return $div[0].getBoundingClientRect().height; });
            var fontByWidth = this._getTextSide($div, { size: fontByHeight, unit: fontModel.unit() }, containerSize.width, function ($div) { return $div[0].getBoundingClientRect().width; });
            $div.remove();
            font = Math.min(fontByHeight, fontByWidth);
        }
        else {
            var $div = this.textElementHelper.$createTextElement(this._control.getText(), this._control.getCssContent({ width: containerSize.width / zoom }));
            font = this._calculateFont($div, { size: font, unit: fontModel.unit() }, containerSize.height - 2 * zoom);
            $div.remove();
        }
        return font;
    };
    FitTextToBoundsAction.prototype.fit = function () {
        this._control.setFontSize(this._getAvailableFont());
    };
    return FitTextToBoundsAction;
}());
exports.FitTextToBoundsAction = FitTextToBoundsAction;
