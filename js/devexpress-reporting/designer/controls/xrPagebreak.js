﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPagebreak.js)
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
var ko = require("knockout");
var XRPageBreakSurface = (function (_super) {
    __extends(XRPageBreakSurface, _super);
    function XRPageBreakSurface(control, context) {
        var _this = _super.call(this, control, context, XRPageBreakSurface._unitProperties) || this;
        _this._disposables.push(_this._width);
        _this.template = 'dxrd-pagebreak';
        _this.contenttemplate = 'dxrd-line-content';
        _this.selectiontemplate = 'dxrd-pagebreak-selection';
        _this._disposables.push(_this.linePosition = ko.pureComputed(function () {
            var rect = _this.rect();
            return {
                'x1': 0,
                'x2': rect.width,
                'y1': rect.height / 2,
                'y2': rect.height / 2
            };
        }));
        _this.contentCss = ko.observable({
            'stroke': 'black',
            'strokeWidth': 1,
            'strokeDasharray': '4px, 4px'
        });
        _this._disposables.push(_this.lineHeight = ko.pureComputed(function () {
            return _this['position'].lineHeight() / _this._context.zoom();
        }));
        _this.css = ko.observable({});
        _this._disposables.push(_this.isIntersect = ko.pureComputed(function () { return false; }));
        return _this;
    }
    XRPageBreakSurface.prototype.preInitProperties = function (control, context) {
        this._width = ko.pureComputed({
            read: function () {
                return context.pageWidth() - context.margins.right() - context.margins.left();
            },
            write: function () { }
        });
    };
    Object.defineProperty(XRPageBreakSurface.prototype, "isIntersectionDeny", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    XRPageBreakSurface._unitProperties = {
        _x: function (o) {
            return ko.observable(0);
        },
        _y: function (o) {
            return o.location.y;
        },
        _height: function (o) {
            return ko.observable(2);
        }
    };
    return XRPageBreakSurface;
}(xrControl_1.XRControlSurfaceBase));
exports.XRPageBreakSurface = XRPageBreakSurface;
