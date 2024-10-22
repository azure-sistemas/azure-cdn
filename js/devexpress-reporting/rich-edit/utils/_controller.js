﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_controller.js)
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
var _locker_1 = require("../../common/utils/_locker");
var _model_1 = require("./_model");
var $ = require("jquery");
var instance_1 = require("../instance");
var XRRichController = (function (_super) {
    __extends(XRRichController, _super);
    function XRRichController(richEdit, xrRichSurfaceModel) {
        var _this = _super.call(this) || this;
        _this.richEdit = richEdit;
        _this.surface = xrRichSurfaceModel;
        _this.init();
        return _this;
    }
    Object.defineProperty(XRRichController.prototype, "controlModel", {
        get: function () {
            return this.surface._control;
        },
        enumerable: true,
        configurable: true
    });
    XRRichController.prototype.createSubscribtions = function () {
        var _this = this;
        this._disposables.push(this.controlModel._newDocumentData.subscribe(function (newData) {
            _this.onDocumentDataChanged(newData && newData.content);
        }));
        this._disposables.push(this.controlModel.serializableRtfString.subscribe(function (value) { return _this.rtfStringChanged(value); }));
        this._disposables.push(this.richEdit.visible.subscribe(function (newValue) { return _this.onVisibilityChanged(newValue); }));
        this._disposables.push(this.surface._height.subscribe(function (val) {
            if (!_this.richEdit.visible() && _this.richEdit._richHeight != null) {
                _this.richEdit.setRichHeight(val);
                _this.richEdit.updateCanvasScroll();
                setTimeout(function () {
                    _this.richEdit.changeSize();
                }, 1);
            }
        }));
    };
    XRRichController.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.richEdit.dispose();
        this.fontModel.dispose();
        this.paddingModel.dispose();
        this.richLoader.dispose();
    };
    XRRichController.prototype.init = function () {
        var _this = this;
        this.locker = new _locker_1.Locker();
        this.fontModel = new _model_1.RichEditFontModel(this.controlModel.font, this.richEdit, this.controlModel.foreColor, this);
        this.paddingModel = new _model_1.RichEditPaddingModelWrapper(this.controlModel.padding, this.richEdit);
        this.richLoader = new _model_1.RichLoader(this.richEdit);
        this.createSubscribtions();
        if (this.surface.serializedRtf()) {
            this.richEdit.openDocument(this.surface.serializedRtf(), 2, $.noop, function () {
                _this.surface.isValid(false);
            });
        }
        else {
            this.rtfStringChanged(this.surface.serializedRtf());
        }
    };
    XRRichController.prototype.setRtfString = function (newRtf) {
        var _this = this;
        this.locker.lock(function () {
            _this.surface.serializedRtf(newRtf);
        });
    };
    XRRichController.prototype.rtfStringChanged = function (newRtfString) {
        var _this = this;
        if (newRtfString === undefined) {
            var openSaveAction = function () {
                _this.richEdit.openDocument(btoa(_this.surface._control.name()), instance_1.getRichEditInstance().DocumentFormat.PlainText, function () {
                    var fontName = _this.fontModel.family.peek();
                    var fontSize = _this.fontModel.size.peek();
                    var rich = _this.richEdit.getRealControl();
                    rich.document.setDefaultCharacterProperties({ fontName: fontName, size: fontSize });
                    rich.executeCommand(instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontName, fontName);
                    rich.executeCommand(instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontSize, fontSize);
                    rich.history.clear();
                    _this.richEdit.saveDocument(2, function (result) { return _this.setRtfString(result); });
                });
            };
            if (this.surface._control.name()) {
                openSaveAction();
            }
            else {
                var subcription = this.surface._control.name.subscribe(function (name) {
                    openSaveAction();
                    subcription.dispose();
                });
            }
        }
        else {
            if (this.locker.isUpdate)
                return;
            this.richEdit.openDocument(newRtfString, 2, $.noop, function () {
                _this.surface.isValid(false);
            });
        }
    };
    XRRichController.prototype.checkValidationState = function () {
        if (this.richEdit.documentIsEmpty() && this._oldValidState == false) {
            this.surface.isValid(false);
            return false;
        }
        return true;
    };
    XRRichController.prototype.onVisibilityChanged = function (newVisibility) {
        var _this = this;
        if (!newVisibility) {
            if (this.checkValidationState())
                this.richEdit.saveDocument(2, function (newRtfString) {
                    _this.setRtfString(newRtfString);
                });
        }
        else {
            this._oldValidState = this.surface.isValid();
            this.surface.isValid(true);
            this.richEdit.getRealControl().focus();
        }
        if (this.richEdit)
            this.richEdit.focusChanged(newVisibility);
    };
    XRRichController.prototype.onDocumentDataChanged = function (newDocument) {
        var _this = this;
        this.richLoader.textConverted = function (newText) {
            if (_this.checkValidationState()) {
                _this.surface.isValid(true);
                _this.setRtfString(newText);
            }
        };
        this.richLoader.load({ data: newDocument, dataFormat: this.controlModel.format(), oldText: this.surface.serializedRtf() });
    };
    return XRRichController;
}(analytics_utils_1.Disposable));
exports.XRRichController = XRRichController;
