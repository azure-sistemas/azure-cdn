﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorModel.js)
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
var pictureEditMode_1 = require("./pictureEditMode");
var _painter_1 = require("./_painter");
var _pictureEditorActionProvider_1 = require("./_pictureEditorActionProvider");
var imageEditingField_1 = require("../../editing/models/imageEditingField");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var popup_1 = require("devextreme/ui/popup");
var events = require("devextreme/events");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var PictureEditorModel = (function (_super) {
    __extends(PictureEditorModel, _super);
    function PictureEditorModel(options, element) {
        var _this = _super.call(this) || this;
        _this.GESTURE_COVER_CLASS = 'dx-gesture-cover';
        _this.ACTIVE_POPUP_CLASS = '.dx-picture-editing-active';
        _this._getPopupContent = function () {
            var popupInstance = popup_1.default['getInstance'](_this.$element.find(_this.ACTIVE_POPUP_CLASS).get(0));
            return popupInstance && $(popupInstance.content());
        };
        _this.actions = [];
        _this.canDraw = ko.observable(false);
        _this._initialImageType = ko.unwrap(options.imageType) || 'png';
        _this.zoom = options.zoom || ko.observable(1);
        _this.editMode = ko.unwrap(options.imageMode) || pictureEditMode_1.PictureEditMode.Image;
        _this._initialImage = ko.unwrap(options.image);
        _this._initialAlignment = ko.unwrap(options.alignment);
        _this._initialSizeMode = ko.unwrap(options.sizeMode);
        _this._callbacks = options.callbacks;
        _this.$element = $(element);
        _this.active = ko.isObservable(options.active) ? options.active : ko.observable(!!options.active);
        var painterOptions = {
            alignment: _this._initialAlignment,
            canDraw: _this.editMode !== pictureEditMode_1.PictureEditMode.Image && _this.canDraw,
            imageSource: _this._initialImage,
            imageType: _this._initialImageType,
            sizeMode: _this._initialSizeMode,
            zoom: _this.zoom
        };
        _this.painter = new _painter_1.Painter(painterOptions);
        _this._disposables.push(_this.painter);
        _this.painter.initSize(_this.$element, _this.zoom());
        _this.actionsProvider = new _pictureEditorActionProvider_1.PictureEditorActionProvider(_this, $.extend(true, {
            getPositionTarget: function () {
                return _this._getPopupContent().find('.dx-picture-editing-toolbar');
            }
        }, (options.popupOptions || {})));
        _this._disposables.push(_this.actionsProvider);
        _this._initActions(options.callbacks && options.callbacks.customizeActions);
        _this.applyBindings();
        return _this;
    }
    PictureEditorModel.prototype._takeFocus = function () {
        if (!this.active()) {
            this._callbacks && this._callbacks.onFocusIn && this._callbacks.onFocusIn(this);
            this.active(true);
        }
        else if (this.editMode !== pictureEditMode_1.PictureEditMode.Image) {
            this.canDraw(true);
            this._callbacks && this._callbacks.onDraw && this._callbacks.onDraw(this);
        }
    };
    PictureEditorModel.prototype._releaseFocus = function () {
        if (this.active()) {
            this._callbacks && this._callbacks.onFocusOut && this._callbacks.onFocusOut(this);
            this.active(false);
            this.canDraw(false);
        }
    };
    PictureEditorModel.prototype._wrapButtonAction = function (item, model) {
        var oldAction = item.action;
        item.action = function (sender, event) {
            model.changeActiveButton(sender);
            if (oldAction)
                oldAction(event, model);
        };
    };
    PictureEditorModel.prototype._initActions = function (customizeActionsCallback) {
        var _this = this;
        if (this.editMode == pictureEditMode_1.PictureEditMode.Image || this.editMode == pictureEditMode_1.PictureEditMode.ImageAndSignature) {
            this.actions.push(this.actionsProvider.createOpenFileAction(function (e) { return _this._loadImage(e); }));
            this.actions.push(this.actionsProvider.createSizingAction());
        }
        if (this.editMode == pictureEditMode_1.PictureEditMode.Signature || this.editMode == pictureEditMode_1.PictureEditMode.ImageAndSignature) {
            this.actions.push(this.actionsProvider.createBrushAction());
        }
        if (!!this._initialImage) {
            this.actions.push(this.actionsProvider.createResetItem(function () {
                _this.painter.reset(_this._initialImage, _this._initialAlignment, _this._initialSizeMode, _this._initialImageType);
            }));
        }
        this.actions.push(this.actionsProvider.createClearItem(function () {
            _this.painter.clear();
        }));
        customizeActionsCallback && customizeActionsCallback(this, this.actions);
        this.actions.forEach(function (item) { return _this._wrapButtonAction(item, _this); });
    };
    PictureEditorModel.prototype._loadImage = function (event) {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        analytics_internal_1.uploadFile({
            accept: 'image/*'
        }).done(function (result) {
            _this.painter.format(result.format);
            _this.painter.image(result.content);
            _this.painter.refresh();
        });
    };
    PictureEditorModel.prototype._addEvents = function () {
        var _this = this;
        this._pointerDownHandler = function (e) {
            _this._takeFocus();
        };
        this._pointerCancelHandler = function (e) {
            _this._releaseFocus();
        };
        this._pointerUpHandler = function (e) {
            if (!_this.active())
                return;
            var isUnderCursor = function (componentContent) {
                return componentContent && (componentContent.is(e.target) || componentContent.has(e.target).length > 0);
            };
            var isEditorContainer = _this.$element.is(e.target) || _this.$element.has(e.target).length > 0
                || isUnderCursor(_this._getPopupContent())
                || _this.actions.some(function (a) {
                    if (!a.active())
                        return false;
                    var component = ko.unwrap(a.component);
                    return isUnderCursor(component && $(component.content()));
                })
                || (e.target && e.target.className && e.target.className.indexOf && e.target.className.indexOf(_this.GESTURE_COVER_CLASS) !== -1);
            if (!isEditorContainer) {
                _this._releaseFocus();
            }
        };
        var element = this.$element.get(0);
        events.on(element, 'dxpointerdown', this._pointerDownHandler);
        events.on(element, 'dxpointercancel', this._pointerCancelHandler);
        events.on(document, 'dxpointerup', this._pointerUpHandler);
    };
    PictureEditorModel.prototype.changeActiveButton = function (selectedItem) {
        this.actions.forEach(function (action) {
            action.active(action === selectedItem && !action.active());
        });
    };
    PictureEditorModel.prototype.applyBindings = function () {
        ko.cleanNode(this.$element[0]);
        ko.applyBindings(this, this.$element[0]);
        this._addEvents();
        this.painter.initCanvas(this.$element, this.zoom());
    };
    PictureEditorModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        var element = this.$element.get(0);
        events.off(element, 'dxpointerdown', this._pointerDownHandler);
        events.off(element, 'dxpointercancel', this._pointerCancelHandler);
        events.off(document, 'dxpointerup', this._pointerUpHandler);
        this.actions.forEach(function (action) { return action.dispose && action.dispose(); });
        this.$element = null;
    };
    PictureEditorModel.prototype.getImage = function () {
        return this.painter.getImage();
    };
    PictureEditorModel.prototype.reset = function (image, alignment, sizeMode, imageType) {
        this._initialImage = image;
        this._initialAlignment = alignment;
        this._initialSizeMode = sizeMode;
        this._initialImageType = imageType;
        this.painter.reset(this._initialImage, this._initialAlignment, this._initialSizeMode, this._initialImageType);
    };
    PictureEditorModel.prototype.getCurrentOptions = function () {
        var imageBase64 = (this.painter.hasSignature() ? this.painter.getImage() : this.painter.image()) || '';
        var imageParts = imageBase64.split(',');
        return {
            sizeMode: this.painter.imageSizeMode(),
            alignment: this.painter.imageAlignment(),
            imageType: this.painter.hasSignature() ? imageEditingField_1.ImageEditingFieldViewModel.__DefaultImageType : this.painter.format(),
            image: imageParts[imageParts.length - 1]
        };
    };
    return PictureEditorModel;
}(analytics_utils_1.Disposable));
exports.PictureEditorModel = PictureEditorModel;
ko.bindingHandlers['dxPictureEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = (valueAccessor());
        $(element).children().remove();
        var templateHtml = analytics_widgets_1.getTemplate('dx-picture-editing');
        var $element = $(element).append(templateHtml);
        var child = $element.children()[0];
        var model = new PictureEditorModel(options, child);
        analytics_internal_1.addDisposeCallback(element, function () {
            model.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
