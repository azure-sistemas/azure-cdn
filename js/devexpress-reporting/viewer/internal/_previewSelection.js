﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewSelection.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var popup_1 = require("devextreme/ui/popup");
var ko = require("knockout");
var $ = require("jquery");
function rectIntersection(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}
var PreviewSelection = (function () {
    function PreviewSelection(_element, _page, _click) {
        var _this = this;
        this._element = _element;
        this._page = _page;
        this._click = _click;
        this._bodyEvents = {
            move: null,
            up: null
        };
        this.dispose = function () { return _this._dispose && _this._dispose(); };
        this._$element = $(this._element);
        var mousemove = function (event) { return _this._mouseMove(event); };
        var mouseup = function (event) { return _this._mouseUp(event); };
        var mousedown = function (event) { return _this._mouseDown(event); };
        this._element.addEventListener('mousemove', mousemove);
        this._element.addEventListener('mouseup', mouseup);
        this._element.addEventListener('mousedown', mousedown);
        this._dispose = function () {
            _this._element.removeEventListener('mousemove', mousemove);
            _this._element.removeEventListener('mouseup', mouseup);
            _this._element.removeEventListener('mousedown', mousedown);
            _this._dispose = null;
            _this._click = null;
            _this._page = null;
            _this._element = null;
            mousemove = null;
            mouseup = null;
            mousedown = null;
        };
    }
    PreviewSelection.prototype._getBodyScrollTop = function () {
        return document.documentElement && document.documentElement.scrollTop || (document.body && document.body.scrollTop);
    };
    PreviewSelection.prototype._getBodyScrollLeft = function () {
        return document.documentElement && document.documentElement.scrollLeft || (document.body && document.body.scrollLeft);
    };
    PreviewSelection.prototype._updateSelectionContent = function (event) {
        if (this._startRect.left > event.clientX) {
            this._$selectionContent.css('left', event.clientX);
        }
        else {
            this._$selectionContent.css('right', document.documentElement.clientWidth - event.clientX);
        }
        if (this._startRect.top > event.clientY) {
            this._$selectionContent.css('top', event.clientY);
        }
        else {
            this._$selectionContent.css('bottom', document.documentElement.clientHeight - event.clientY);
        }
        var offset = this._$element.offset();
        var currentRect = {
            left: (parseInt(this._$selectionContent.css('left')) - offset.left + this._getBodyScrollLeft()) / this._$element.width() * 100,
            width: this._$selectionContent.width() / this._$element.width() * 100,
            top: (parseInt(this._$selectionContent.css('top')) - offset.top + this._getBodyScrollTop()) / this._$element.height() * 100,
            height: this._$selectionContent.height() / this._$element.height() * 100
        };
        currentRect['right'] = currentRect.left + currentRect.width;
        currentRect['bottom'] = currentRect.top + currentRect.height;
        var bricks = this._page.bricks();
        for (var i = 0; i < bricks.length; i++) {
            if (!bricks[i].bricks) {
                bricks[i].active(rectIntersection({
                    left: parseFloat(bricks[i].leftP),
                    top: parseFloat(bricks[i].topP),
                    right: parseFloat(bricks[i].leftP) + parseFloat(bricks[i].widthP),
                    bottom: parseFloat(bricks[i].topP) + parseFloat(bricks[i].heightP),
                }, currentRect));
            }
        }
    };
    PreviewSelection.prototype._mouseMove = function (event) {
        var _this = this;
        if (!this._startRect || !this._page.active() || PreviewSelection.disabled)
            return;
        var leftButtonPressed = event.which === 1;
        if (leftButtonPressed) {
            if (!this._$selectionContainer) {
                if (Math.abs(this._startRect.left - event.clientX) >= 2 || Math.abs(this._startRect.top - event.clientY) >= 2) {
                    PreviewSelection.started = true;
                    this._$selectionContainer = $('<div style="position: fixed; top: 0; bottom: 0; left: 0; right: 0">').appendTo(document.body);
                    this._$selectionContent = $('<div>').appendTo(this._$selectionContainer);
                    this._$selectionContent.css(this._startRect);
                    this._$selectionContent.addClass('dxrd-selection-content ui-selectable-helper');
                    if (popup_1.default.prototype._zIndexInitValue)
                        this._$selectionContent.css('z-index', popup_1.default.prototype._zIndexInitValue() + 100);
                    this._updateSelectionContent(event);
                    this._bodyEvents.move = function (event) { return _this._mouseMove(event); };
                    this._bodyEvents.up = function (event) { return _this._mouseUp(event); };
                    document.body.addEventListener('mousemove', this._bodyEvents.move);
                    document.body.addEventListener('mouseup', this._bodyEvents.up);
                }
            }
            else {
                this._updateSelectionContent(event);
            }
        }
    };
    PreviewSelection.prototype._mouseUp = function (event) {
        this._$selectionContainer && this._$selectionContainer.remove();
        this._$selectionContainer = null;
        this._bodyEvents.move && document.body.removeEventListener('mousemove', this._bodyEvents.move);
        this._bodyEvents.up && document.body.removeEventListener('mouseup', this._bodyEvents.up);
        this._startRect = null;
        setTimeout(function () {
            PreviewSelection.started = false;
        }, 1);
    };
    PreviewSelection.prototype._mouseDown = function (event) {
        if (PreviewSelection.disabled) {
            return;
        }
        this._startRect = {
            left: event.clientX,
            top: event.clientY,
            right: document.documentElement.clientWidth - event.clientX,
            bottom: document.documentElement.clientHeight - event.clientY
        };
        this._click(this._page.pageIndex);
    };
    PreviewSelection.started = false;
    PreviewSelection.disabled = false;
    return PreviewSelection;
}());
exports.PreviewSelection = PreviewSelection;
ko.bindingHandlers['brick-selection-prog'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var values = valueAccessor(), unwrappedValues = ko.unwrap(values);
        var selection = new PreviewSelection(element, unwrappedValues.page, unwrappedValues.click);
        analytics_internal_1.addDisposeCallback(element, function () {
            selection.dispose();
        });
    }
};
