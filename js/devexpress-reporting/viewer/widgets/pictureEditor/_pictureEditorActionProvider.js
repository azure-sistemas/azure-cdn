﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorActionProvider.js)
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
var _utils_1 = require("../../internal/_utils");
var _pictureEditorToolbarItem_1 = require("./_pictureEditorToolbarItem");
var editingField_1 = require("../../editing/editingField");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _pictureEditorTypes_1 = require("./_pictureEditorTypes");
var PictureEditorActionProvider = (function (_super) {
    __extends(PictureEditorActionProvider, _super);
    function PictureEditorActionProvider(_editorModel, _popupOptions) {
        var _this = _super.call(this) || this;
        _this._editorModel = _editorModel;
        _this._popupOptions = _popupOptions;
        return _this;
    }
    PictureEditorActionProvider.prototype._getValues = function (enumType, prefix, propertyName) {
        var _this = this;
        var array = [];
        _utils_1.getEnumValues(enumType).forEach(function (item) {
            array.push({
                value: item,
                iconTemplate: 'dxrd-svg-pictureeditor-' + prefix + '_' + item.toLowerCase(),
                isSelected: ko.computed(function () { return _this._editorModel.painter[propertyName]() === enumType[item]; }),
                action: function () {
                    _this._editorModel.painter[propertyName](enumType[item]);
                    _this._editorModel.painter.refresh();
                }
            });
        });
        return array;
    };
    PictureEditorActionProvider.prototype._getColorValues = function () {
        var _this = this;
        var array = [];
        PictureEditorActionProvider.colors.forEach(function (item) {
            array.push({
                value: item,
                isSelected: ko.computed(function () { return _this._editorModel.painter.lineColor() === item; }),
                action: function (e) {
                    _this._editorModel.painter.lineColor(item);
                }
            });
        });
        return array;
    };
    PictureEditorActionProvider.prototype._initPopupOptions = function (options) {
        var _this = this;
        options.boundary = this._popupOptions.boundary;
        options.getPositionTarget = function () { return _this._popupOptions.getPositionTarget(); };
        options.target = this._popupOptions.target;
        options.container = this._popupOptions.container;
        return options;
    };
    PictureEditorActionProvider.prototype.createOpenFileAction = function (action) {
        var openFileActionOptions = {
            id: _pictureEditorTypes_1.PictureEditorActionId.OpenFile,
            icon: 'dxrd-svg-pictureeditor-toolbar_open',
            title: analytics_utils_1.getLocalization('Load Image', 'PreviewStringId.ImageEditingFieldEditor_LoadImage'),
            active: ko.observable(false),
            action: function (e) { return action(e); }
        };
        return new _pictureEditorToolbarItem_1.PictureEditorToolbarItem(openFileActionOptions);
    };
    PictureEditorActionProvider.prototype.createImagePickerAction = function (images, filterEnabled, action) {
        var _this = this;
        filterEnabled = filterEnabled && images.every(function (image) { return image.text !== undefined; });
        var active = ko.observable(false);
        var filter = ko.observable('');
        images.forEach(function (image) {
            if (filterEnabled) {
                _this._disposables.push(image.visible = ko.computed(function () {
                    return !!analytics_internal_1.findMatchesInString(image.text, filter());
                }));
            }
            else {
                image.visible = true;
            }
        });
        var popupOptions = this._initPopupOptions({
            width: 'auto',
            height: analytics_internal_1.calculateWithZoomFactor(300) + 'px',
            visible: active,
            contentTemplate: filterEnabled ? 'dx-picture-editing-imagepickerwithfilter' : 'dx-picture-editing-imagespicker',
            contentData: {
                filterEnabled: filterEnabled,
                filter: filter,
                searchPlaceholder: function () { return analytics_internal_1.searchPlaceholder(); },
                contentWidth: this._editorModel.painter.initialSize.width * 2 + 35,
                width: Math.min(this._editorModel.painter.initialSize.width, 150),
                height: Math.min(this._editorModel.painter.initialSize.height, 150),
                action: function (data) {
                    if (data.url) {
                        _utils_1.getImageBase64(data.url).done(function (result) {
                            action(result);
                        }).fail(function (e) {
                            analytics_internal_1.ShowMessage(e.name + ' :' + e.message.split(':').pop(), 'error');
                        });
                    }
                    else {
                        action(data.data);
                    }
                },
                images: images
            }
        });
        return new _pictureEditorToolbarItem_1.PictureEditorToolbarItemWithPopup({
            id: _pictureEditorTypes_1.PictureEditorActionId.PickImage,
            icon: 'dxrd-svg-pictureeditor-image_gallery',
            title: analytics_utils_1.getLocalization('Choose Image', 'PreviewStringId.ImageEditingFieldEditor_ChooseImage'),
            active: active,
            template: 'dx-picture-editing-toolbar-popup',
            templateOptions: popupOptions
        });
    };
    PictureEditorActionProvider.prototype.createSizingAction = function () {
        var alignmentActive = ko.observable(false);
        var popupOptions = this._initPopupOptions({
            width: analytics_internal_1.calculateWithZoomFactor(174) + 'px',
            height: analytics_internal_1.calculateWithZoomFactor(300) + 'px',
            visible: alignmentActive,
            contentTemplate: 'dx-picture-editing-sizemode-alignment',
            contentData: {
                sizeModeText: analytics_utils_1.getLocalization('Size Mode', 'PreviewStringId.ImageEditingFieldEditor_SizeMode'),
                sizeMode: this._editorModel.painter.imageSizeMode,
                sizeModeValues: this._getValues(editingField_1.ImageSizeMode, 'size_mode', 'imageSizeMode'),
                alignmentText: analytics_utils_1.getLocalization('Alignment', 'PreviewStringId.ImageEditingFieldEditor_Alignment'),
                alignment: this._editorModel.painter.imageAlignment,
                alignmentValues: this._getValues(editingField_1.ImageAlignment, 'alignment', 'imageAlignment'),
            }
        });
        return new _pictureEditorToolbarItem_1.PictureEditorToolbarItemWithPopup({
            id: _pictureEditorTypes_1.PictureEditorActionId.Alignment,
            icon: 'dxrd-svg-pictureeditor-toolbar_size_mode_and_alignment',
            title: analytics_utils_1.getLocalization('Size Mode and Alignment', 'PreviewStringId.ImageEditingFieldEditor_SizeModeAndAlignment'),
            active: alignmentActive,
            template: 'dx-picture-editing-toolbar-popup',
            templateOptions: popupOptions
        });
    };
    PictureEditorActionProvider.prototype.createBrushAction = function () {
        var brushItemActive = ko.observable(false);
        var popupOptions = this._initPopupOptions({
            width: analytics_internal_1.calculateWithZoomFactor(226) + 'px',
            height: analytics_internal_1.calculateWithZoomFactor(295) + 'px',
            visible: brushItemActive,
            contentTemplate: 'dx-picture-editing-brush-options',
            contentData: {
                lineWidth: this._editorModel.painter.lineWidth,
                lineColor: this._editorModel.painter.lineColor,
                colors: this._getColorValues(),
                brushWidthText: analytics_utils_1.getLocalization('Brush size', 'PreviewStringId.ImageEditingFieldEditor_BrushSize'),
                brushColorText: analytics_utils_1.getLocalization('Brush color', 'PreviewStringId.ImageEditingFieldEditor_BrushColor'),
            }
        });
        return new _pictureEditorToolbarItem_1.PictureEditorToolbarItemWithPopup({
            id: _pictureEditorTypes_1.PictureEditorActionId.Brush,
            icon: 'dxrd-svg-pictureeditor-toolbar_brush_options',
            title: analytics_utils_1.getLocalization('Brush Options', 'PreviewStringId.ImageEditingFieldEditor_BrushOptions'),
            active: brushItemActive,
            template: 'dx-picture-editing-toolbar-popup',
            templateOptions: popupOptions,
            renderedHandler: function (elem, mod) {
                if (elem[0].nodeName.toLowerCase() === 'svg') {
                    var brushIcon = $(elem[0]).find('.BrushColor');
                    if (brushIcon) {
                        brushIcon.attr('data-bind', '{ style: { fill: $data.templateOptions.contentData.lineColor }}');
                        ko.applyBindingsToDescendants(mod, brushIcon[0]);
                    }
                }
            }
        });
    };
    PictureEditorActionProvider.prototype.createResetItem = function (action) {
        var clearItemOptions = {
            id: _pictureEditorTypes_1.PictureEditorActionId.Reset,
            icon: 'dxrd-svg-pictureeditor-toolbar_reset',
            title: analytics_utils_1.getLocalization('Reset', 'PreviewStringId.ImageEditingFieldEditor_Reset'),
            active: ko.observable(false),
            action: function (e) { return action(); }
        };
        return new _pictureEditorToolbarItem_1.PictureEditorToolbarItem(clearItemOptions);
    };
    PictureEditorActionProvider.prototype.createClearItem = function (action) {
        var clearItemOptions = {
            id: _pictureEditorTypes_1.PictureEditorActionId.Clear,
            icon: 'dxrd-svg-pictureeditor-toolbar_clear',
            title: analytics_utils_1.getLocalization('Clear', 'PreviewStringId.ImageEditingFieldEditor_Clear'),
            active: ko.observable(false),
            action: function (e) { return action(); }
        };
        return new _pictureEditorToolbarItem_1.PictureEditorToolbarItem(clearItemOptions);
    };
    PictureEditorActionProvider.colors = ['#FFFFFF', '#FFC0C0', '#FFE0C0', '#FFFFC0', '#C0FFC0', '#C0FFFF', '#C0C0FF', '#FFC0FF', '#E0E0E0', '#FF8080', '#FFC080', '#FFFF80', '#80FF80', '#80FFFF', '#8080FF', '#FF80FF', '#C0C0C0', '#FF0000', '#FF8000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#808080', '#C00000', '#C04000', '#C0C000', '#00C000', '#00C0C0', '#0000C0', '#C000C0', '#404040', '#800000', '#804000', '#808000', '#008000', '#008080', '#000080', '#800080', '#000000', '#400000', '#804040', '#404000', '#004000', '#004040', '#000040', '#400040'];
    return PictureEditorActionProvider;
}(analytics_utils_1.Disposable));
exports.PictureEditorActionProvider = PictureEditorActionProvider;
