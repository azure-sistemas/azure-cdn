﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_painter.js)
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
var editingField_1 = require("../../editing/editingField");
var _imagePainter_1 = require("./_imagePainter");
var _signaturePainter_1 = require("./_signaturePainter");
var imageEditingField_1 = require("../../editing/models/imageEditingField");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var events = require("devextreme/events");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var Painter = (function (_super) {
    __extends(Painter, _super);
    function Painter(options) {
        var _this = _super.call(this) || this;
        _this._pointerDownHandler = function (e) {
            var point = _this._getContextPoint(e);
            point && _this.signaturePainter.drawCircle(_this._context, point.x, point.y, _this.lineColor(), _this.lineWidth());
        };
        _this._pointerMoveHandler = function (e) {
            if (e.pointerType === 'touch' || e.pointerType === 'pen' || (e.pointerType === 'mouse' && e.originalEvent['buttons'] == 1)) {
                var point = _this._getContextPoint(e);
                point && _this.signaturePainter.drawPath(_this._context, point.x, point.y, _this.lineColor(), _this.lineWidth());
            }
        };
        _this._pointerLeaveHandler = function (e) {
            _this.signaturePainter.resetLastPosition();
        };
        _this.format = function (newVal) {
            if (newVal)
                _this.imagePainter.format(newVal);
            return _this.imagePainter.format();
        };
        _this.imageSizeMode = ko.observable(editingField_1.ImageSizeMode.Normal);
        _this.imageAlignment = ko.observable(editingField_1.ImageAlignment.TopLeft);
        _this.lineWidth = ko.observable(1);
        _this.lineColor = ko.observable('#000000');
        _this.zoom = options.zoom;
        _this.image = ko.observable(options.imageSource);
        _this.imageSizeMode(options.sizeMode);
        _this.imageAlignment(options.alignment);
        _this.imagePainter = new _imagePainter_1.ImagePainter({
            alignment: _this.imageAlignment,
            imageSource: _this.image,
            sizeMode: _this.imageSizeMode
        });
        _this.format(options.imageType);
        _this._disposables.push(_this.signaturePainter = new _signaturePainter_1.SignaturePainter());
        _this._disposables.push(_this.signaturePainter.hasPoints.subscribe(function (newVal) {
            if (newVal)
                _this._setCanvasSize(_this.initialSize.width, _this.initialSize.height);
            else
                _this._setCanvasSize(_this.initialSize.width * _this.zoom(), _this.initialSize.height * _this.zoom());
            _this.refresh();
        }));
        _this._disposables.push(_this.scale = ko.computed(function () {
            return _this.hasSignature() ? _this.zoom() : 1;
        }));
        if (options.canDraw) {
            _this._disposables.push((options.canDraw).subscribe(function (newValue) {
                if (newValue) {
                    _this._addEvents();
                }
                else {
                    _this._removeEvents();
                }
            }));
        }
        _this._disposables.push(_this.zoom.subscribe(function (newVal) {
            if (!_this.signaturePainter.hasPoints()) {
                _this._setCanvasSize(_this.initialSize.width * newVal, _this.initialSize.height * newVal);
                _this.refresh();
            }
        }));
        return _this;
    }
    Painter.prototype._getContextPoint = function (e) {
        if (e.target.nodeName !== 'CANVAS')
            return;
        var zoom = this.zoom();
        var x, y;
        if (e.offsetX && e.offsetY) {
            zoom = this.hasSignature() ? 1 : zoom;
            x = e.offsetX / zoom;
            y = e.offsetY / zoom;
        }
        else {
            var rect = this._context.canvas.getBoundingClientRect();
            x = (e.clientX - rect.left) / zoom;
            y = (e.clientY - rect.top) / zoom;
        }
        return { x: x, y: y };
    };
    Painter.prototype._addEvents = function () {
        var element = this.$element.get(0);
        events.on(element, 'dxpointerdown', this._pointerDownHandler);
        events.on(element, 'dxpointermove', this._pointerMoveHandler);
        events.on(element, 'dxpointerleave', this._pointerLeaveHandler);
    };
    Painter.prototype._removeEvents = function () {
        var element = this.$element.get(0);
        events.off(element, 'dxpointerdown', this._pointerDownHandler);
        events.off(element, 'dxpointermove', this._pointerMoveHandler);
        events.off(element, 'dxpointerleave', this._pointerLeaveHandler);
    };
    Painter.prototype._setCanvasSize = function (width, height) {
        this._context.canvas.setAttribute('width', width);
        this._context.canvas.setAttribute('height', height);
    };
    Painter.prototype._cleanCanvas = function () {
        this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    };
    Painter.prototype.clear = function () {
        this.image(null);
        this.signaturePainter.reset();
        this._cleanCanvas();
    };
    Painter.prototype.refresh = function () {
        var _this = this;
        this._cleanCanvas();
        var zoom = this.signaturePainter.hasPoints() ? 1 : this.zoom();
        var size = this.signaturePainter.hasPoints() ? this.initialSize : undefined;
        this.imagePainter.refresh(this._context, zoom, size)
            .done(function () { return _this.signaturePainter.refresh(_this._context); });
    };
    Painter.prototype.initSize = function (element, zoom) {
        this.$element = element;
        this.initialSize = {
            width: this.$element.outerWidth() / zoom,
            height: this.$element.outerHeight() / zoom
        };
    };
    Painter.prototype.initCanvas = function (element, zoom) {
        var canvas = this.$element.find('canvas')[0];
        this._context = canvas.getContext('2d');
        this._setCanvasSize(this.initialSize.width * zoom, this.initialSize.height * zoom);
        this.imagePainter.refresh(this._context, zoom, {
            width: this._context.canvas.offsetWidth,
            height: this._context.canvas.offsetHeight
        });
    };
    Painter.prototype.imageFormatByType = function (imageType) {
        return imageType === imageEditingField_1.ImageEditingFieldViewModel.__DefaultImageType ? 'png' : imageType;
    };
    Painter.prototype.getImage = function () {
        return this._context.canvas.toDataURL('image/png');
    };
    Painter.prototype.hasSignature = function () {
        return this.signaturePainter.hasPoints();
    };
    Painter.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._removeEvents();
        this.$element = null;
        this._context = null;
    };
    Painter.prototype.reset = function (initialImage, initialAlignment, initialSizeMode, initialImageType) {
        this.image(initialImage);
        this.imageAlignment(initialAlignment);
        this.imageSizeMode(initialSizeMode);
        this.format(this.imageFormatByType(initialImageType));
        this.signaturePainter.reset();
        this.refresh();
    };
    return Painter;
}(analytics_utils_1.Disposable));
exports.Painter = Painter;
ko.bindingHandlers['dxPainter'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = (valueAccessor());
        $(element).children().remove();
        var templateHtml = analytics_widgets_1.getTemplate('dx-painter');
        var $element = $(element).append(templateHtml);
        var child = $element.children()[0];
        var $child = $(child);
        var model = new Painter(options);
        model.initSize($child, options.zoom());
        analytics_internal_1.addDisposeCallback(element, function () {
            model.dispose();
        });
        ko.applyBindings(model, child);
        model.initCanvas($child, options.zoom());
        return { controlsDescendantBindings: true };
    }
};
