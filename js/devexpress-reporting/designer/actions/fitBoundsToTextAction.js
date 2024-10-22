﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitBoundsToTextAction.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _textElementSizeHelper_1 = require("../helpers/_textElementSizeHelper");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var FitBoundsToTextAction = (function () {
    function FitBoundsToTextAction(_control, textElementHelper) {
        if (textElementHelper === void 0) { textElementHelper = new _textElementSizeHelper_1.TextElementSizeHelper(); }
        this._control = _control;
        this.textElementHelper = textElementHelper;
    }
    FitBoundsToTextAction.prototype._getNewRectForVetical = function (textHeight, alignment) {
        var contentSize = this._control.getContentSize();
        var controlRect = this._control.rect();
        var difference = contentSize.height - textHeight;
        if (alignment === 'Middle') {
            return { top: controlRect.top + difference / 2, height: controlRect.height - difference };
        }
        else if (alignment === 'Bottom') {
            return { top: controlRect.top + difference, height: controlRect.height - difference };
        }
        else {
            return { height: controlRect.height - difference };
        }
    };
    FitBoundsToTextAction.prototype._findWidth = function (text, currentWidth) {
        var _this = this;
        var content = this._control.getCssContent();
        if (!this._control.getWordWrap()) {
            return this.textElementHelper.getTextContainerSize(text, content).width;
        }
        var horOffset = 0;
        ['Left', 'Right'].forEach(function (propertyName) {
            horOffset += (parseFloat(content['padding' + propertyName]) * _this._control._context.zoom());
            delete content['padding' + propertyName];
        });
        var words = text.split(' ');
        var wordsWidths = words.map(function (line) { return _this.textElementHelper.getTextContainerSize(line, content).width; });
        if (wordsWidths.some(function (width) { return width + horOffset > currentWidth; })) {
            return currentWidth;
        }
        var spaceWidth = this.textElementHelper.getTextContainerSize('&nbsp', content).width;
        return wordsWidths.reduce(function (accumulator, currentVal, index) {
            if (index === 0)
                return accumulator;
            var newVal = spaceWidth + currentVal;
            accumulator.lineWidth += newVal;
            if (accumulator.lineWidth + horOffset > currentWidth) {
                accumulator.lineWidth = currentVal;
            }
            if (accumulator.max < accumulator.lineWidth) {
                accumulator.max = accumulator.lineWidth;
            }
            return accumulator;
        }, { lineWidth: wordsWidths[0], max: wordsWidths[0] }).max + horOffset;
    };
    FitBoundsToTextAction.prototype._getNewRectForHorizontal = function (textWidth, alignment) {
        var contentSize = this._control.getContentSize();
        var controlRect = this._control.rect();
        var difference = contentSize.width - textWidth;
        if (alignment === 'Center') {
            return { left: controlRect.left + difference / 2, width: controlRect.width - difference };
        }
        else if (alignment === 'Right') {
            return { left: controlRect.left + difference, width: controlRect.width - difference };
        }
        else {
            return { width: controlRect.width - difference };
        }
    };
    FitBoundsToTextAction.prototype._getTextContainerSize = function (content) {
        return this.textElementHelper.getTextContainerSize(this._control.getText(), this._control.getCssContent(content));
    };
    FitBoundsToTextAction.prototype._getTextHeight = function () {
        var content = { width: this._control.getContentSize().width / this._control._context.zoom() };
        return this._getTextContainerSize(content).height;
    };
    FitBoundsToTextAction.prototype.fitWidth = function () {
        var width = this._findWidth(this._control.getText(), this._control.getContentSize().width);
        var horizontalAlignment = this._control.getAlignments().horizontal;
        this._control.rect(this._getNewRectForHorizontal(width, horizontalAlignment));
    };
    FitBoundsToTextAction.prototype.fitHeight = function () {
        var height = this._getTextHeight();
        var verticalAlignment = this._control.getAlignments().vertical;
        this._control.rect(this._getNewRectForVetical(height, verticalAlignment));
    };
    FitBoundsToTextAction.prototype.fitBounds = function () {
        var size = {
            width: this._findWidth(this._control.getText(), this._control.getContentSize().width),
            height: this._getTextHeight()
        };
        var alignment = this._control.getAlignments();
        this._control.rect(analytics_internal_1.extend({}, this._getNewRectForHorizontal(size.width, alignment.horizontal), this._getNewRectForVetical(size.height, alignment.vertical)));
    };
    return FitBoundsToTextAction;
}());
exports.FitBoundsToTextAction = FitBoundsToTextAction;
