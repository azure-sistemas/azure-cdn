﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorToolbarItem.js)
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
var ko = require("knockout");
var $ = require("jquery");
var PictureEditorToolbarItem = (function () {
    function PictureEditorToolbarItem(options) {
        this.id = options.id;
        this.icon = options.icon;
        this.action = options.action;
        this.active = options.active;
        this.renderedHandler = options.renderedHandler;
        this.title = options.title;
    }
    PictureEditorToolbarItem.prototype.dispose = function () {
        this.renderedHandler = null;
        this.action = null;
    };
    return PictureEditorToolbarItem;
}());
exports.PictureEditorToolbarItem = PictureEditorToolbarItem;
var PopupComponentBase = (function (_super) {
    __extends(PopupComponentBase, _super);
    function PopupComponentBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._component = ko.observable();
        _this.onContentReady = function (e) {
            _this._component(e.component);
        };
        _this.closeOnOutsideClick = function (e) {
            var component = _this.getComponent();
            var $content = component && $(component.content());
            return !$content || !($content.has(e.target).length || $content.is(e.target));
        };
        return _this;
    }
    PopupComponentBase.prototype.getComponent = function () {
        return ko.unwrap(this._component);
    };
    PopupComponentBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        var component = this._component();
        component && component.dispose();
        this._component(null);
    };
    return PopupComponentBase;
}(analytics_utils_1.Disposable));
exports.PopupComponentBase = PopupComponentBase;
var PictureEditorToolbarItemWithPopup = (function (_super) {
    __extends(PictureEditorToolbarItemWithPopup, _super);
    function PictureEditorToolbarItemWithPopup(options) {
        var _this = _super.call(this, options) || this;
        _this.template = options.template;
        if (options.templateOptions) {
            _this.templateOptions = options.templateOptions;
            _this._popup = new PopupComponentBase();
            _this.templateOptions.onContentReady = _this._popup.onContentReady;
            _this.templateOptions.closeOnOutsideClick = _this._popup.closeOnOutsideClick;
            _this.templateOptions.onShown = function (e) {
                var $element = $(e.element);
                var topElement = $element.position().top;
                var popupsOffset = e['model'].getPositionTarget().offset().top - $(e.component.content()).offset().top;
                var $arrow = $($element.find('.dx-popover-arrow')[0]);
                $arrow.css('top', popupsOffset + topElement - 24 - 11);
            };
        }
        return _this;
    }
    PictureEditorToolbarItemWithPopup.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._popup.dispose();
        this.templateOptions = null;
    };
    return PictureEditorToolbarItemWithPopup;
}(PictureEditorToolbarItem));
exports.PictureEditorToolbarItemWithPopup = PictureEditorToolbarItemWithPopup;
