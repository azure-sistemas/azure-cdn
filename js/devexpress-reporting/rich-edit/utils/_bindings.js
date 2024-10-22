﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_bindings.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var _model_1 = require("./_model");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var RichEditVirtualScroll = (function (_super) {
    __extends(RichEditVirtualScroll, _super);
    function RichEditVirtualScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        return _this;
    }
    RichEditVirtualScroll.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._viewPort = null;
        this.items = [];
    };
    RichEditVirtualScroll.prototype.registerViewPort = function (viewPort) {
        var _this = this;
        this._viewPort = viewPort;
        var updateRich = function () { return _this.updateRichPosition(); };
        this._viewPort.addEventListener('scroll', updateRich, true);
        this._disposables.push({
            dispose: function () { return _this._viewPort.removeEventListener('scroll', updateRich, true); }
        });
    };
    RichEditVirtualScroll.prototype.registerRichEditControl = function (element, model) {
        var _this = this;
        this.isDisposing = false;
        if (!this._viewPort) {
            this.registerViewPort($(element).closest('.dxrd-viewport')[0]);
        }
        var richItem = { element: element, model: model };
        this.updateRich(richItem, this._viewPort.getBoundingClientRect());
        this.items.push(richItem);
        this._disposables.push(model.visible.subscribe(function (newVal) { return _this.updateRich(richItem, _this._viewPort.getBoundingClientRect()); }));
    };
    RichEditVirtualScroll.prototype.unregisterRichEditControl = function (element) {
        var currentIndex = -1;
        this.items.some(function (x, index) {
            if (x.element === element) {
                currentIndex = index;
                return true;
            }
            return false;
        });
        if (currentIndex !== -1)
            this.items.splice(currentIndex, 1);
        if (this.items.length === 0)
            this.dispose();
    };
    RichEditVirtualScroll.prototype.updateRich = function (item, viewPortRect) {
        var currentHeight = Math.min(item.element.clientHeight, this._viewPort.clientHeight);
        if (!item.model.visible()) {
            var elementRect = item.element.getBoundingClientRect();
            var newVerticalScrollOffset = viewPortRect.top - elementRect.top;
            if (elementRect.bottom - viewPortRect.top < 0 || elementRect.top > viewPortRect.bottom) {
                currentHeight = 0;
                newVerticalScrollOffset = 0;
            }
            if (item.model._richHeight != currentHeight || item.model._verticalScrollOffset != newVerticalScrollOffset) {
                item.model.setRichHeight(currentHeight);
                item.model._verticalScrollOffset = newVerticalScrollOffset;
                item.model.updateCanvasScroll();
            }
        }
        else {
            item.model.setRichHeight(null);
            item.model._verticalScrollOffset = 0;
            item.model.updateCanvasScroll();
        }
    };
    RichEditVirtualScroll.prototype.updateRichPosition = function () {
        var _this = this;
        var viewPortRect = this._viewPort.getBoundingClientRect();
        this.items.forEach(function (x) { return _this.updateRich(x, viewPortRect); });
    };
    return RichEditVirtualScroll;
}(analytics_utils_1.Disposable));
exports.RichEditVirtualScroll = RichEditVirtualScroll;
var virtualScroll = new RichEditVirtualScroll();
ko.bindingHandlers['dxRichSurface'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).children().remove();
        var model = viewModel;
        if (model.controller && model.controller.richEdit) {
            var _richElement = model.controller.richEdit._element;
            if (ko.dataFor(_richElement) && document.getElementById(_richElement.id)) {
                $(element).closest('.dxrd-control').css('display', 'none');
            }
            else {
                $(element).append(_richElement);
                ko.applyBindings(model.controller.richEdit, _richElement);
                virtualScroll.registerRichEditControl(_richElement, model.controller.richEdit);
                analytics_internal_1.addDisposeCallback(element, function () {
                    virtualScroll.unregisterRichEditControl(_richElement);
                });
            }
        }
        else {
            var editorOptions = valueAccessor();
            var templateHtml = analytics_widgets_1.getTemplate('dxrd-rich-edit');
            var inlineControl = editorOptions.inlineEdit;
            var richElement = $(element).append(templateHtml).children()[0];
            var richEditModel = new _model_1.XRRichEditControlModel(richElement, inlineControl, model.selected);
            model.createController(richEditModel);
            ko.applyBindings(richEditModel, richElement);
            virtualScroll.registerRichEditControl(richElement, richEditModel);
            analytics_internal_1.addDisposeCallback(element, function () {
                virtualScroll.unregisterRichEditControl(richElement);
            });
        }
        return { controlsDescendantBindings: true };
    }
};
