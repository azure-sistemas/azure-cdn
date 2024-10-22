﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewEditingFieldsKeyboardHelper.js)
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
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var PreviewEditingFieldsKeyboardHelper = (function (_super) {
    __extends(PreviewEditingFieldsKeyboardHelper, _super);
    function PreviewEditingFieldsKeyboardHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controlElementClassName = 'dx-accessibility-editing-field-item';
        _this.accessibilityCompliantEnabled = true;
        return _this;
    }
    PreviewEditingFieldsKeyboardHelper.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setTabIndexes(0);
    };
    PreviewEditingFieldsKeyboardHelper.prototype.clickHandler = function () { };
    PreviewEditingFieldsKeyboardHelper.prototype.itemHandleEnterKey = function (e, index) {
        var item = this.controlElements[index];
        item.actionExecute(e);
        return true;
    };
    PreviewEditingFieldsKeyboardHelper.prototype.itemHandleSpaceKey = function (e, index) {
        return this.itemHandleEnterKey(e, index);
    };
    PreviewEditingFieldsKeyboardHelper.prototype.createControlElement = function (element, index) {
        return new PreviewEditingFieldsElement(element, ko.dataFor(element));
    };
    return PreviewEditingFieldsKeyboardHelper;
}(analytics_internal_1.AccessibilityKeyboardHelperBase));
exports.PreviewEditingFieldsKeyboardHelper = PreviewEditingFieldsKeyboardHelper;
var PreviewEditingFieldsElement = (function (_super) {
    __extends(PreviewEditingFieldsElement, _super);
    function PreviewEditingFieldsElement(element, model) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.model = model;
        _this._processFocus = true;
        _this._activateHandler = function (e) {
            if (_this.model.activateEditor && _this._processFocus) {
                _this.model.activateEditor(_this.model, { target: _this.element, currentTarget: _this.element });
                _this.element.setAttribute('tabindex', '-1');
                var subscription = _this.model.active.subscribe(function (value) {
                    if (!value) {
                        _this.element.setAttribute('tabindex', '0');
                        if (document.activeElement === document.body) {
                            _this._processFocus = false;
                            _this.element.focus();
                        }
                        subscription.dispose();
                    }
                });
                _this._disposables.push(subscription);
            }
        };
        _this._blur = function (e) {
            _this._processFocus = true;
        };
        element.addEventListener('focus', _this._activateHandler);
        element.addEventListener('blur', _this._blur);
        return _this;
    }
    PreviewEditingFieldsElement.prototype.dispose = function () {
        this.element.removeEventListener('focus', this._activateHandler);
        this.element.removeEventListener('blur', this._blur);
        _super.prototype.dispose.call(this);
    };
    PreviewEditingFieldsElement.prototype.actionExecute = function (e) {
        if (this.model.activateEditor)
            this._activateHandler(e);
        else if (this.model.onClick)
            this.model.onClick(this.model, e);
    };
    return PreviewEditingFieldsElement;
}(analytics_internal_1.AccessibilityControlElementBase));
