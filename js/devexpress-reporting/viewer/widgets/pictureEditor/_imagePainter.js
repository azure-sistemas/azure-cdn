﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_imagePainter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editingField_1 = require("../../editing/editingField");
var ko = require("knockout");
var $ = require("jquery");
var ImagePainter = (function () {
    function ImagePainter(options) {
        this.format = ko.observable();
        this.image = options.imageSource;
        this.sizeMode = options.sizeMode;
        this.alignment = options.alignment;
    }
    ImagePainter.prototype._drawImage = function (imageSource, context, scale, contentSize) {
        var _this = this;
        var deferred = $.Deferred();
        if (!imageSource)
            return deferred.resolve().promise();
        var background = new Image();
        var prefix = 'data:image/' + (this.format() || 'png') + ';base64,';
        if (this.format() === 'svg') {
            prefix = 'data:image/svg+xml;charset=UTF-8;base64,';
        }
        var imageBase64 = imageSource.indexOf('base64,') !== -1 ? imageSource : prefix + imageSource;
        background.src = imageBase64;
        background.onload = function () {
            var size = _this._getImageSize(background, scale, contentSize);
            var location = _this._getImageCoordinate(size, contentSize);
            context.drawImage(background, location.x, location.y, size.width, size.height);
            deferred.resolve();
        };
        return deferred.promise();
    };
    ImagePainter.prototype._getImageSize = function (image, scale, contentSize) {
        var sizeMode = this.sizeMode();
        var width = image.width * scale, height = image.height * scale;
        if (sizeMode === editingField_1.ImageSizeMode.StretchImage) {
            width = contentSize.width;
            height = contentSize.height;
        }
        else if (sizeMode === editingField_1.ImageSizeMode.Cover || sizeMode === editingField_1.ImageSizeMode.ZoomImage || (sizeMode === editingField_1.ImageSizeMode.Squeeze && (contentSize.width < width || contentSize.height < height))) {
            var ratio = (sizeMode === editingField_1.ImageSizeMode.Cover ? Math.max : Math.min)(contentSize.width / width, contentSize.height / height);
            width *= ratio;
            height *= ratio;
        }
        return { width: width, height: height };
    };
    ImagePainter.prototype._getImageCoordinate = function (imageSize, contentSize) {
        var alignment = this.alignment();
        var x = 0, y = 0;
        if (!(alignment in editingField_1.ImageAlignment) && (this.sizeMode() === editingField_1.ImageSizeMode.Cover || this.sizeMode() === editingField_1.ImageSizeMode.ZoomImage)) {
            alignment = editingField_1.ImageAlignment.MiddleCenter;
        }
        if (alignment === editingField_1.ImageAlignment.MiddleLeft || alignment === editingField_1.ImageAlignment.MiddleCenter || alignment === editingField_1.ImageAlignment.MiddleRight) {
            y = (contentSize.height - imageSize.height) / 2;
        }
        else if (alignment === editingField_1.ImageAlignment.BottomLeft || alignment === editingField_1.ImageAlignment.BottomCenter || alignment === editingField_1.ImageAlignment.BottomRight) {
            y = contentSize.height - imageSize.height;
        }
        if (alignment === editingField_1.ImageAlignment.TopCenter || alignment === editingField_1.ImageAlignment.MiddleCenter || alignment === editingField_1.ImageAlignment.BottomCenter) {
            x = (contentSize.width - imageSize.width) / 2;
        }
        else if (alignment === editingField_1.ImageAlignment.TopRight || alignment === editingField_1.ImageAlignment.MiddleRight || alignment === editingField_1.ImageAlignment.BottomRight) {
            x = contentSize.width - imageSize.width;
        }
        return { x: x, y: y };
    };
    ImagePainter.prototype.refresh = function (context, scale, contentSize) {
        if (scale === void 0) { scale = 1; }
        contentSize = contentSize || {
            width: context.canvas.width,
            height: context.canvas.height
        };
        return this._drawImage(this.image(), context, scale, contentSize);
    };
    return ImagePainter;
}());
exports.ImagePainter = ImagePainter;
