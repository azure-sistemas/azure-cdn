﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_signaturePainter.js)
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
var ko = require("knockout");
var SignaturePainter = (function (_super) {
    __extends(SignaturePainter, _super);
    function SignaturePainter() {
        var _this = _super.call(this) || this;
        _this._points = ko.observableArray([]);
        _this.hasPoints = ko.computed(function () { return _this._points().length > 0; });
        _this._disposables.push(_this.hasPoints);
        return _this;
    }
    SignaturePainter.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.reset();
    };
    SignaturePainter.prototype._drawPath = function (context, x, y, lastX, lastY, color, lineWidth) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.lineJoin = 'round';
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
    };
    SignaturePainter.prototype._drawCircle = function (context, x, y, color, lineWidth) {
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, lineWidth / 2, 0, 2 * Math.PI, false);
        context.fill();
    };
    SignaturePainter.prototype._drawAllPoints = function (context) {
        var _this = this;
        this._points().forEach(function (point) {
            if (point.isStart) {
                _this._drawCircle(context, point.x, point.y, point.color, point.width);
            }
            else {
                _this._drawPath(context, point.x, point.y, point.lastX, point.lastY, point.color, point.width);
            }
        });
    };
    SignaturePainter.prototype.drawCircle = function (context, x, y, color, width) {
        this._lastX = x;
        this._lastY = y;
        this._drawCircle(context, x, y, color, width);
        this._points.push({ x: this._lastX, y: this._lastY, color: color, width: width, isStart: true });
    };
    SignaturePainter.prototype.drawPath = function (context, x, y, color, width) {
        this._drawPath(context, x, y, this._lastX, this._lastY, color, width);
        this._points.push({ x: x, y: y, lastX: this._lastX, lastY: this._lastY, color: color, width: width });
        this._lastX = x;
        this._lastY = y;
    };
    SignaturePainter.prototype.resetLastPosition = function () {
        this._lastX = undefined;
        this._lastY = undefined;
    };
    SignaturePainter.prototype.resetPoints = function () {
        this._points([]);
    };
    SignaturePainter.prototype.reset = function () {
        this.resetLastPosition();
        this.resetPoints();
    };
    SignaturePainter.prototype.refresh = function (context) {
        this._drawAllPoints(context);
    };
    return SignaturePainter;
}(analytics_utils_1.Disposable));
exports.SignaturePainter = SignaturePainter;
