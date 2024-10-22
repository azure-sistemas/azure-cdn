﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\popupImageEditingField.js)
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
var imageEditingField_1 = require("./imageEditingField");
var ko = require("knockout");
var $ = require("jquery");
var PopupImageEditingFieldViewModel = (function (_super) {
    __extends(PopupImageEditingFieldViewModel, _super);
    function PopupImageEditingFieldViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parentPopupClass = 'dxrp-editing-field-popup-container';
        _this._popupInitializedClass = 'dxrp-editing-field-popup-container-initialized';
        _this._getPopupContainer = function (element) { return $(element).closest('.' + _this.parentPopupClass); };
        _this._getPainterModel = function (element) {
            var $painter = _this._getPopupContainer(element).find('.dx-painter');
            return $painter.length ? ko.dataFor($painter[0]) : null;
        };
        _this._getPictureEditorModel = function (element) {
            var $popupEditing = $(element).find('.dx-picture-editing');
            return $popupEditing.length ? ko.dataFor($popupEditing[0]) : null;
        };
        _this._resetPictureEditor = function (pictureEditorModel) {
            pictureEditorModel.reset(_this.painterData.imageSource, _this.painterData.alignment, _this.painterData.sizeMode, _this.painterData.imageType);
            _this._resetPainter(pictureEditorModel.painter);
        };
        _this._resetPainter = function (painter) {
            painter.imagePainter.format(painter.imageFormatByType(_this.getImageType()));
            painter.imagePainter.sizeMode(_this.sizeMode());
            painter.imagePainter.alignment(_this.alignment());
            painter.imagePainter.image(_this.getImage());
            painter.refresh();
        };
        _this.template = 'dxrp-popup-editing-field-image';
        return _this;
    }
    PopupImageEditingFieldViewModel.prototype.isPopupActive = function (element) {
        return this.active() && this._getPopupContainer(element).hasClass(this._popupInitializedClass);
    };
    PopupImageEditingFieldViewModel.prototype.getPainter = function () {
        if (this.painterData == null) {
            this.painterData = {
                imageSource: this.getImage(),
                imageType: this.getImageType(),
                alignment: this.alignment(),
                sizeMode: this.sizeMode(),
                zoom: this.zoom,
                canDraw: ko.observable(false)
            };
        }
        return this.painterData;
    };
    PopupImageEditingFieldViewModel.prototype.getPopupData = function () {
        var _this = this;
        var _showContent = ko.observable(false);
        this.popupData = {
            contentData: this,
            paintData: this.painterData,
            contentTemplate: 'dxrp-editing-field-image-editor',
            isVisible: function (element) { return _this.isPopupActive(element); },
            getContainer: function () { return _this.popupTarget; },
            getPositionTarget: function (element) { return _this._getPopupContainer(element); },
            showContent: _showContent,
            onShown: function (e) {
                _showContent(true);
            },
            onHiding: function (e) {
                _this._getPictureEditorModel(e.component._$popupContent[0]).painter.signaturePainter.resetLastPosition();
                _this._resetPainter(_this._getPainterModel(e.element));
                document.activeElement['blur']();
                _this.active(false);
            },
            onContentReady: function (e) {
                _this._resetPainter(_this._getPainterModel(e.element));
                e.component && e.component.registerKeyHandler('tab', function (_) {
                    _this.popupData.onHiding(e);
                });
            },
            renderedHandler: function (element, model) {
                _this._resetPictureEditor(_this._getPictureEditorModel(element));
            }
        };
        return this.popupData;
    };
    PopupImageEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
        if (!this.field.readOnly()) {
            var _parentPopup = this._getPopupContainer(e.target);
            if (!_parentPopup.hasClass(this._popupInitializedClass))
                _parentPopup.addClass(this._popupInitializedClass);
            this.active(true);
        }
    };
    return PopupImageEditingFieldViewModel;
}(imageEditingField_1.ImageEditingFieldViewModel));
exports.PopupImageEditingFieldViewModel = PopupImageEditingFieldViewModel;
exports.DefaultImageEditingFieldViewModel = PopupImageEditingFieldViewModel;
