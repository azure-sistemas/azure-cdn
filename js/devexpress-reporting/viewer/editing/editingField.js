﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\editingField.js)
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
var checkEditingField_1 = require("./models/checkEditingField");
var textEditingField_1 = require("./models/textEditingField");
var characterCombEditingField_1 = require("./models/characterCombEditingField");
var popupImageEditingField_1 = require("./models/popupImageEditingField");
var ko = require("knockout");
var $ = require("jquery");
var settings_1 = require("../settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ImageAlignment;
(function (ImageAlignment) {
    ImageAlignment[ImageAlignment["TopLeft"] = 1] = "TopLeft";
    ImageAlignment[ImageAlignment["TopCenter"] = 2] = "TopCenter";
    ImageAlignment[ImageAlignment["TopRight"] = 3] = "TopRight";
    ImageAlignment[ImageAlignment["MiddleLeft"] = 4] = "MiddleLeft";
    ImageAlignment[ImageAlignment["MiddleCenter"] = 5] = "MiddleCenter";
    ImageAlignment[ImageAlignment["MiddleRight"] = 6] = "MiddleRight";
    ImageAlignment[ImageAlignment["BottomLeft"] = 7] = "BottomLeft";
    ImageAlignment[ImageAlignment["BottomCenter"] = 8] = "BottomCenter";
    ImageAlignment[ImageAlignment["BottomRight"] = 9] = "BottomRight";
})(ImageAlignment = exports.ImageAlignment || (exports.ImageAlignment = {}));
var ImageSizeMode;
(function (ImageSizeMode) {
    ImageSizeMode[ImageSizeMode["Normal"] = 0] = "Normal";
    ImageSizeMode[ImageSizeMode["StretchImage"] = 1] = "StretchImage";
    ImageSizeMode[ImageSizeMode["ZoomImage"] = 4] = "ZoomImage";
    ImageSizeMode[ImageSizeMode["Squeeze"] = 5] = "Squeeze";
    ImageSizeMode[ImageSizeMode["Cover"] = 7] = "Cover";
})(ImageSizeMode = exports.ImageSizeMode || (exports.ImageSizeMode = {}));
var EditingField = (function (_super) {
    __extends(EditingField, _super);
    function EditingField(model, index, htmlProvider) {
        var _this = _super.call(this) || this;
        _this._needToUseHtml = false;
        _this._index = -1;
        _this._model = model;
        _this._index = index;
        _this._readOnly = ko.observable(model.readOnly);
        _this._disposables.push(_this.readOnly = ko.pureComputed({
            read: function () {
                return _this._readOnly() || !settings_1.EditablePreviewEnabled();
            },
            write: function (newVal) {
                _this._readOnly(newVal);
            }
        }));
        _this.modelValue = ko.observable(model.editValue);
        _this.editValue = ko.computed({
            read: function () {
                return _this.modelValue();
            },
            write: function (newVal) {
                var oldVal = _this.modelValue();
                _this.modelValue(newVal);
                var val = _this.editingFieldChanged(_this, oldVal, newVal);
                val = val == null ? newVal : val;
                if (val !== oldVal) {
                    _this._refreshHtmlValue(val);
                }
                if (val !== newVal) {
                    _this.modelValue(val);
                    _this._editorValue(val);
                }
            }
        });
        _this._editorValue = ko.observable(model.editValue);
        _this.htmlValue = ko.observable(model.htmlValue);
        _this._htmlProvider = htmlProvider;
        return _this;
    }
    EditingField.prototype._refreshHtmlValue = function (newValue) {
        var _this = this;
        this.htmlValue(null);
        if (this._needToUseHtml) {
            this._htmlProvider.getEditingFieldHtml(newValue, this._index).done(function (html) {
                _this.htmlValue(html);
            });
        }
    };
    EditingField.prototype.editingFieldChanged = function (field, oldVal, newVal) {
        return newVal;
    };
    EditingField.prototype.editorName = function () { return this._model.editorName; };
    EditingField.prototype.id = function () { return this._model.id; };
    EditingField.prototype.groupID = function () { return this._model.groupID; };
    EditingField.prototype.pageIndex = function () { return this._model.pageIndex; };
    EditingField.prototype.type = function () { return this._model.type; };
    EditingField.prototype.model = function () {
        return $.extend({}, this._model, {
            readOnly: this.readOnly.peek(),
            editValue: this.editValue.peek(),
            htmlValue: this.htmlValue.peek(),
        });
    };
    EditingField.prototype.createViewModel = function (zoom, pageWidth, pageHeight, editingFieldsProvider, bounds) {
        if (this._model.type === 'check') {
            return new checkEditingField_1.CheckEditingFieldViewModel(this, pageWidth, pageHeight, zoom, editingFieldsProvider);
        }
        else if (this._model.type === 'text') {
            this._needToUseHtml = bounds.height !== this._model.bounds.height || !!this._model.brickOptions.formatString;
            if (!this._needToUseHtml) {
                this.htmlValue(null);
            }
            return new textEditingField_1.TextEditingFieldViewModel(this, pageWidth, pageHeight, zoom, bounds);
        }
        else if (this._model.type === 'charactercomb') {
            return new characterCombEditingField_1.CharacterCombEditingFieldViewModel(this, pageWidth, pageHeight, zoom, bounds);
        }
        else if (this._model.type === 'image') {
            return new popupImageEditingField_1.DefaultImageEditingFieldViewModel(this, pageWidth, pageHeight, zoom, bounds);
        }
    };
    return EditingField;
}(analytics_utils_1.Disposable));
exports.EditingField = EditingField;
