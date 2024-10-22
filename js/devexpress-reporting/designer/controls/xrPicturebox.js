﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPicturebox.js)
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
var xrControl_1 = require("./xrControl");
var imageSource_1 = require("../../common/imageSource");
var xrPicturebox_1 = require("./metadata/xrPicturebox");
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var base64ImageParser_1 = require("../utils/base64ImageParser");
var XRPictureBoxViewModel = (function (_super) {
    __extends(XRPictureBoxViewModel, _super);
    function XRPictureBoxViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.imageRatio = { x: 1, y: 1 };
        _this.originalImageWidth = ko.observable();
        _this.originalImageHeight = ko.observable();
        var imageHeight = ko.observable(_this.size.height()), imageWidth = ko.observable(_this.size.width());
        _this._sizing = ko.observable(_this.sizing());
        _this.size['_width'] = _this.size.width;
        _this.size['_height'] = _this.size.height;
        _this.size.isPropertyDisabled = function (propertyName) {
            return _this._sizing() === 'AutoSize';
        };
        if (!_this.imageSource() && model['@Image']) {
            _this.imageSource(new imageSource_1.ImageSource('img', model['@Image']));
            delete _this['_model']['@Image'];
        }
        var oldSizingValue = _this._sizing();
        _this._disposables.push(_this.sizing = ko.computed({
            read: function () {
                return _this._sizing();
            },
            write: function (value) {
                var undo = analytics_utils_1.UndoEngine.tryGetUndoEngine(_this);
                undo && undo.start();
                if (oldSizingValue === 'AutoSize') {
                    _this.size['_width'](imageWidth());
                    _this.size['_height'](imageHeight());
                }
                oldSizingValue = value;
                _this._sizing(value);
                if (value === 'CenterImage')
                    _this.imageAlignment('MiddleCenter');
                undo && undo.end();
            }
        }));
        _this._disposables.push(_this.size.width = ko.pureComputed({
            read: function () {
                return _this.isAutoSize ? imageWidth() : _this.size['_width']();
            },
            write: function (value) {
                if (!_this.isAutoSize) {
                    _this.size['_width'](value);
                }
            }
        }));
        _this._disposables.push(_this.size.height = ko.pureComputed({
            read: function () {
                return _this.isAutoSize ? imageHeight() : _this.size['_height']();
            },
            write: function (value) {
                if (!_this.isAutoSize) {
                    _this.size['_height'](value);
                }
            }
        }));
        _this._disposables.push(ko.computed(function () {
            var img = new Image();
            img.onload = function () {
                var report = _this.root;
                _this._disposables.push(ko.computed(function () {
                    _this.originalImageWidth(analytics_internal_1.pixelToUnits(img.width * _this.imageRatio.x, report.measureUnit(), 1));
                    _this.originalImageHeight(analytics_internal_1.pixelToUnits(img.height * _this.imageRatio.y, report.measureUnit(), 1));
                }));
            };
            var imageSource = _this.imageSource();
            if (imageSource) {
                img.src = imageSource.getDataUrl();
                _this.imageRatio = base64ImageParser_1.Base64ImageParser.getImageRatio(imageSource.data, imageSource.sourceType);
            }
            else
                _this.imageRatio = { x: 1, y: 1 };
        }));
        var toPixel = function (value) {
            return analytics_internal_1.unitsToPixel(value, _this.root['measureUnit']());
        };
        _this._disposables.push(ko.computed(function () {
            if (_this.isAutoSize && _this.imageSource.peek()) {
                var borders = new analytics_internal_1.BordersModel({ value: _this['borders'] }), borderWidth = _this['borderWidth']() || 0, top, bottom, left, right, paddings = (_this['paddingObj']);
                top = borders.top() ? borderWidth : 0;
                bottom = borders.bottom() ? borderWidth : 0;
                left = borders.left() ? borderWidth : 0;
                right = borders.right() ? borderWidth : 0;
                imageWidth(_this.originalImageWidth() + right + left + toPixel(paddings.left()) + toPixel(paddings.right()));
                imageHeight(_this.originalImageHeight() + top + bottom + toPixel(paddings.top()) + toPixel(paddings.bottom()));
            }
        }));
        _this._disposables.push(_this.isSmallerImage = ko.pureComputed(function () {
            return _this.originalImageWidth() <= _this.size.width() && _this.originalImageHeight() <= _this.size.height();
        }));
        _this._disposables.push(_this.imageUrl.subscribe(function (newVal) {
            if (newVal) {
                _this.imageSource(null);
                _this.imageRatio = { x: 1, y: 1 };
            }
        }));
        _this._disposables.push(_this.imageSource.subscribe(function (newVal) {
            if (newVal) {
                _this.imageUrl(xrPicturebox_1.imageUrl.defaultVal);
            }
        }));
        return _this;
    }
    XRPictureBoxViewModel.prototype.isAlignmentDisabled = function () {
        return ['Tile', 'StretchImage', 'AutoSize', 'Cover'].indexOf(this._sizing()) !== -1;
    };
    XRPictureBoxViewModel.prototype.isPropertyDisabled = function (propertyName) {
        if (propertyName === 'imageAlignment')
            return this.isAlignmentDisabled();
        return _super.prototype.isPropertyDisabled.call(this, propertyName);
    };
    Object.defineProperty(XRPictureBoxViewModel.prototype, "isAutoSize", {
        get: function () {
            return this._sizing() === 'AutoSize';
        },
        enumerable: true,
        configurable: true
    });
    return XRPictureBoxViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRPictureBoxViewModel = XRPictureBoxViewModel;
var backgroundSizeCss = ['-o-background-size', 'mozBackgroundSize', 'backgroundSize'];
var backgroundOriginCss = ['background-origin', '-webkit-background-origin', ' -o-background-origin', 'mozBackgroundOrigin', 'backgroundOrigin'];
var XRPictureBoxSurface = (function (_super) {
    __extends(XRPictureBoxSurface, _super);
    function XRPictureBoxSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.selectiontemplate = 'dxrd-picturebox-selection';
        var control = _this.getControlModel();
        _this.contentHeightWithoutZoom.dispose();
        _this.contentWidthWithoutZoom.dispose();
        _this.contentSizes.dispose();
        _this._disposables.push(_this.contentSizes = ko.pureComputed(function () { return _this.cssCalculator.contentSizeCss(_this.rect().width, _this.rect().height, _this._context.zoom(), _this._control['borders'](), _this._control.paddingObj); }));
        _this._disposables.push(_this.contentHeightWithoutZoom = ko.pureComputed(function () { return _this.contentSizes().height / _this._context.zoom(); }));
        _this._disposables.push(_this.contentWidthWithoutZoom = ko.pureComputed(function () { return _this.contentSizes().width / _this._context.zoom(); }));
        _this._disposables.push(_this.css = ko.pureComputed(function () { return {}; }));
        _this._disposables.push(_this.contentCss = ko.pureComputed(function () {
            var imageSource = control.imageSource();
            var urlContent = imageSource
                ? imageSource.getDataUrl()
                : control.imageUrl();
            return analytics_internal_1.extend({}, _this._createBackimage(control['backColor'](), urlContent, control.sizing(), control.isSmallerImage()), _this._createBackgroundOrigin(), control.isAlignmentDisabled() ? {} : _this._createBackgroundPosition(control.imageAlignment()), _this.cssCalculator.createVerticalAlignment('Top'));
        }));
        return _this;
    }
    XRPictureBoxSurface.prototype._createBackgroundPosition = function (alignment) {
        var x = '0%';
        var y = '0%';
        if (alignment.indexOf('Middle') !== -1)
            y = '50%';
        if (alignment.indexOf('Bottom') !== -1)
            y = '100%';
        if (alignment.indexOf('Center') !== -1)
            x = '50%';
        if (alignment.indexOf('Right') !== -1)
            x = '100%';
        return {
            backgroundPosition: [x, y].join(' ')
        };
    };
    XRPictureBoxSurface.prototype._createBackimage = function (background, urlContent, sizing, isSmallerImage) {
        var backgroundResult = {};
        if (urlContent) {
            backgroundResult = { background: background + ' url(' + urlContent + ') no-repeat' };
            if (this._control.imageSource()) {
                var imageFormat = this._control.imageSource().sourceType;
                if (imageFormat == 'png' || imageFormat == 'jpg' || imageFormat == 'jpeg') {
                    var size = this._control.originalImageWidth() + 'px ' + this._control.originalImageHeight() + 'px';
                    backgroundSizeCss.forEach(function (propName) { backgroundResult[propName] = size; });
                }
            }
            if (sizing) {
                if (sizing === 'Squeeze') {
                    sizing = isSmallerImage ? 'CenterImage' : 'ZoomImage';
                }
                switch (sizing) {
                    case 'StretchImage':
                        for (var i = 0; i < backgroundSizeCss.length; i++) {
                            backgroundResult[backgroundSizeCss[i]] = '100% 100%';
                        }
                        break;
                    case 'ZoomImage':
                    case 'Cover':
                        for (var i = 0; i < backgroundSizeCss.length; i++) {
                            backgroundResult[backgroundSizeCss[i]] = sizing === 'ZoomImage' ? 'contain' : 'cover';
                        }
                        backgroundResult['backgroundPosition'] = 'center center';
                        break;
                    case 'AutoSize':
                        for (var i = 0; i < backgroundSizeCss.length; i++) {
                            backgroundResult[backgroundSizeCss[i]] = '100% 100%';
                        }
                        break;
                    case 'Tile':
                        backgroundResult['backgroundRepeat'] = 'repeat';
                }
            }
            return backgroundResult;
        }
        backgroundResult = { background: background };
        return backgroundResult;
    };
    XRPictureBoxSurface.prototype._createBackgroundOrigin = function () {
        var result = {};
        for (var i = 0; i < backgroundOriginCss.length; i++) {
            result[backgroundOriginCss[i]] = 'content-box';
        }
        result['width'] = this.contentWidthWithoutZoom() + 'px';
        result['height'] = this.contentHeightWithoutZoom() + 'px';
        return result;
    };
    XRPictureBoxSurface.prototype.getResizeOptions = function (resizeHandler) {
        var _this = this;
        if (!this.resizeOptions && resizeHandler) {
            var resizeDisabled = ko.computed(function () {
                return resizeHandler.disabled && resizeHandler.disabled() || _this._control.sizing() === 'AutoSize';
            });
            this.resizeOptions = {
                disabled: resizeDisabled,
                snapHelper: resizeHandler.snapHelper,
                starting: resizeHandler.starting,
                stopped: resizeHandler.stopped
            };
            this._disposables.push(resizeDisabled);
        }
        return this.resizeOptions;
    };
    XRPictureBoxSurface.prototype.getAdornTemplate = function () {
        var superAdornTemplate = _super.prototype.getAdornTemplate.call(this), placeholder = this.hasBindings || !this.getControlModel().imageSource() ? 'dxrd-image-surface-picturebox_placeholder' : '';
        return superAdornTemplate + (superAdornTemplate && placeholder ? ' ' : '') + placeholder;
    };
    return XRPictureBoxSurface;
}(xrControl_1.XRControlSurface));
exports.XRPictureBoxSurface = XRPictureBoxSurface;
