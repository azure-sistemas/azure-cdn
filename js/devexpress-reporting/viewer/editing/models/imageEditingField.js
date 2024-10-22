﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\imageEditingField.js)
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
var metadata_1 = require("../../../common/metadata");
var editingFieldExtensions_1 = require("../../../common/utils/editingFieldExtensions");
var pictureEditMode_1 = require("../../widgets/pictureEditor/pictureEditMode");
var _previewSelection_1 = require("../../internal/_previewSelection");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ImageEditingFieldViewModel = (function (_super) {
    __extends(ImageEditingFieldViewModel, _super);
    function ImageEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.zoom = zoom;
        _this.bounds = bounds;
        _this.popupTarget = '.dx-designer';
        _this.popupOptions = {
            target: _this.popupTarget,
            boundary: _this.popupTarget,
            container: _this.popupTarget
        };
        _this.template = 'dxrp-editing-field-image';
        _this.active = ko.observable(false);
        var brickStyle = field.model().brickOptions;
        var style = { rtl: function () { return brickStyle.rtl; } };
        new analytics_utils_1.ModelSerializer().deserialize(style, JSON.parse(brickStyle.style), metadata_1.brickStyleSerializationsInfo);
        var cssCalculator = new analytics_internal_1.CssCalculator(style, ko.observable(!!brickStyle.rtlLayout));
        _this._disposables.push(_this.alignment = ko.computed(function () {
            return field.editValue().alignment;
        }), _this.sizeMode = ko.computed(function () {
            return field.editValue().sizeMode;
        }));
        var editor = editingFieldExtensions_1.EditingFieldExtensions.instance().editor(field.editorName());
        var options = editor ? editor.options : { editMode: pictureEditMode_1.PictureEditMode.ImageAndSignature };
        _this.editMode = options.editMode;
        _this.containerStyle = function () {
            return $.extend({
                height: _this.bounds.height * zoom() + 'px',
                width: _this.bounds.width * zoom() + 'px',
                zIndex: _this.active() ? 10 : 0,
                top: _this.bounds.top * 100 / pageHeight + '%',
                left: _this.bounds.left * 100 / pageWidth + '%'
            }, cssCalculator.borderCss(), cssCalculator.paddingsCss());
        };
        _this.callbacks = $.extend({
            onDraw: function (s) { return _this.onDraw(s); },
            onFocusIn: function (s) { return _this.onFocusIn(s); },
            onFocusOut: function (s) { return _this.onBlur(s); }
        }, options.callbacks);
        return _this;
    }
    ImageEditingFieldViewModel.prototype.getImage = function () {
        return this.field.editValue().image;
    };
    ImageEditingFieldViewModel.prototype.getImageType = function () {
        return this.field.editValue().imageType;
    };
    ImageEditingFieldViewModel.prototype.getPictureEditorOptions = function () {
        return {
            image: this.getImage(),
            imageType: this.getImageType(),
            imageMode: ko.observable(this.editMode),
            alignment: this.alignment,
            sizeMode: this.sizeMode,
            callbacks: this.callbacks,
            active: this.active,
            zoom: this.zoom,
            popupOptions: this.popupOptions
        };
    };
    ImageEditingFieldViewModel.prototype.onKeyDown = function (_, e) {
        if (e.key == analytics_internal_1.KeyboardEnum.Space) {
        }
        else {
        }
    };
    ImageEditingFieldViewModel.prototype.onFocusIn = function (s) {
        _previewSelection_1.PreviewSelection.disabled = true;
    };
    ImageEditingFieldViewModel.prototype.onDraw = function (s) {
        _previewSelection_1.PreviewSelection.disabled = true;
    };
    ImageEditingFieldViewModel.prototype.onBlur = function (s) {
        var options = s.getCurrentOptions();
        this.field.editValue($.extend({}, this.field.editValue(), options, { imageType: options.imageType === 'svg' ? 'svg' : ImageEditingFieldViewModel.__DefaultImageType }));
        _previewSelection_1.PreviewSelection.disabled = false;
    };
    ImageEditingFieldViewModel.__DefaultImageType = 'img';
    return ImageEditingFieldViewModel;
}(analytics_utils_1.Disposable));
exports.ImageEditingFieldViewModel = ImageEditingFieldViewModel;
