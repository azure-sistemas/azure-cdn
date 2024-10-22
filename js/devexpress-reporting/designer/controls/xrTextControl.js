﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTextControl.js)
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
var xrControl_1 = require("./xrControl");
var _textElementSizeHelper_1 = require("../helpers/_textElementSizeHelper");
var fitTextToBoundsAction_1 = require("../actions/fitTextToBoundsAction");
var fitBoundsToTextAction_1 = require("../actions/fitBoundsToTextAction");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var XRTextControlSurfaceBase = (function (_super) {
    __extends(XRTextControlSurfaceBase, _super);
    function XRTextControlSurfaceBase(control, context, units) {
        if (units === void 0) { units = xrControl_1.XRControlSurface._unitProperties; }
        var _this = _super.call(this, control, context, units) || this;
        _this._$element = ko.observable(null);
        _this._font = null;
        _this.contenttemplate = 'dxrd-textcontrol-content';
        _this['multiline'] = control['multiline'] || false;
        _this._disposables.push(_this._font = new analytics_widgets_internal_1.FontModel(control['font']));
        var canGrow = function () { return control['canGrow'] && control['canGrow'](); };
        var textElementSizeHelper = new _textElementSizeHelper_1.TextElementSizeHelper();
        _this.fitTextToBoundsAction = new fitTextToBoundsAction_1.FitTextToBoundsAction(_this, textElementSizeHelper);
        _this.fitBoundsToTextAction = new fitBoundsToTextAction_1.FitBoundsToTextAction(_this, textElementSizeHelper);
        _this._disposables.push(_this.characterHeight = ko.computed(function () {
            return textElementSizeHelper.getTextContainerSize('a', {
                'font-size': _this._font.size() + _this._font.unit(),
                'font-family': _this._font.family(),
                'height': 'auto',
                'width': 'auto'
            }).height;
        }));
        _this._disposables.push(ko.computed(function () {
            if (_this._$element()) {
                _this._$element().height('auto');
                var text = _this._control['text']();
                var characterHeight = _this.characterHeight();
                var contentHeight = _this._$element().height();
                if (contentHeight > _this.rect().height && !canGrow()) {
                    var visibleHeight = Math.floor(_this.rect().height / characterHeight) * characterHeight;
                    if (visibleHeight)
                        _this._$element().height(visibleHeight + 'px');
                }
            }
        }));
        return _this;
    }
    XRTextControlSurfaceBase.prototype.getAlignments = function () {
        var textAlignment = this._control['textAlignment']();
        var vertical = '';
        var horizontal = '';
        for (var i = 0; i < textAlignment.length; i++) {
            if (textAlignment[i] === textAlignment[i].toLocaleUpperCase()) {
                if (vertical === '') {
                    vertical += textAlignment[i];
                }
                else if (vertical !== '') {
                    horizontal += textAlignment[i];
                }
            }
            else {
                if (horizontal !== '') {
                    horizontal += textAlignment[i];
                }
                else {
                    vertical += textAlignment[i];
                }
            }
        }
        return {
            vertical: vertical,
            horizontal: horizontal
        };
    };
    XRTextControlSurfaceBase.prototype.getWordWrap = function () {
        return this._control['wordWrap'] && this._control['wordWrap']();
    };
    XRTextControlSurfaceBase.prototype.getCssContent = function (content) {
        if (content === void 0) { content = {}; }
        return analytics_internal_1.extend({}, this.contentCss(), {
            'box-sizing': 'border-box',
            'height': 'auto',
            'display': 'inline-block',
            'width': 'auto',
            'transform': 'scale(' + this._context.zoom() + ')'
        }, content);
    };
    XRTextControlSurfaceBase.prototype.getContentSize = function () {
        return this.contentSizes();
    };
    XRTextControlSurfaceBase.prototype.getText = function () {
        return this.displayText();
    };
    XRTextControlSurfaceBase.prototype.getFontModel = function () {
        return this._font;
    };
    XRTextControlSurfaceBase.prototype.setFontSize = function (size) {
        this._font.size(size);
    };
    XRTextControlSurfaceBase.prototype.cacheElementContent = function ($element) {
        this._$element(null);
        this._$element($element);
    };
    XRTextControlSurfaceBase.prototype.fitTextToBounds = function () {
        this.fitTextToBoundsAction.fit();
    };
    XRTextControlSurfaceBase.prototype.fitWidthToText = function () {
        this.fitBoundsToTextAction.fitWidth();
    };
    XRTextControlSurfaceBase.prototype.fitHeightToText = function () {
        this.fitBoundsToTextAction.fitHeight();
    };
    XRTextControlSurfaceBase.prototype.fitBoundsToText = function () {
        this.fitBoundsToTextAction.fitBounds();
    };
    return XRTextControlSurfaceBase;
}(xrControl_1.XRControlSurfaceBase));
exports.XRTextControlSurfaceBase = XRTextControlSurfaceBase;
