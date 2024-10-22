﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrShape.js)
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
var xrShape_1 = require("./metadata/xrShape");
var _reportRenderingService_1 = require("../services/_reportRenderingService");
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var XRShapeViewModel = (function (_super) {
    __extends(XRShapeViewModel, _super);
    function XRShapeViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.Shape(XRShapeViewModel.createShape(_this.Shape() || {}, serializer));
        _this.shapeFake = {
            type: ko.pureComputed({
                read: function () {
                    return _this.Shape()['shapeType']();
                },
                write: function (val) {
                    var selectedShape = XRShapeViewModel.shapes.filter(function (shape) { return shape['displayName'] === val; })[0];
                    var shape = XRShapeViewModel.createShape($.extend({ '@ShapeName': selectedShape['type'] }, selectedShape['val']), serializer);
                    if (selectedShape['angle'] !== void 0) {
                        _this['angle'](selectedShape['angle']);
                    }
                    if (XRShapeViewModel.timeout === 0) {
                        _this.Shape(shape);
                    }
                    else {
                        setTimeout(function () {
                            _this.Shape(shape);
                        }, XRShapeViewModel.timeout);
                    }
                }
            }),
            content: _this.Shape
        };
        _this._disposables.push(_this.shapeFake.type);
        return _this;
    }
    XRShapeViewModel.createShape = function (model, serializer) {
        if (serializer === void 0) { serializer = null; }
        var type = model && model['@ShapeName'] || 'Ellipse';
        var shapeInfo = xrShape_1.shapesMap[type];
        var newShape = { 'shapeType': ko.observable(type), 'getInfo': function () { return shapeInfo; } };
        (serializer || new analytics_utils_1.ModelSerializer()).deserialize(newShape, model);
        return newShape;
    };
    XRShapeViewModel.timeout = 1;
    XRShapeViewModel.shapes = [
        {
            displayName: 'Rectangle',
            type: 'Rectangle'
        },
        {
            displayName: 'Ellipse'
        },
        {
            displayName: 'Top Arrow',
            angle: 0,
            type: 'Arrow'
        },
        {
            displayName: 'Right Arrow',
            angle: 270,
            type: 'Arrow'
        },
        {
            displayName: 'Bottom Arrow',
            angle: 180,
            type: 'Arrow'
        },
        {
            displayName: 'Left Arrow',
            angle: 90,
            type: 'Arrow'
        },
        {
            displayName: 'Triangle',
            type: 'Polygon'
        },
        {
            displayName: 'Square',
            val: {
                '@NumberOfSides': 4
            },
            type: 'Polygon'
        },
        {
            displayName: 'Pentagon',
            val: {
                '@NumberOfSides': 5
            },
            type: 'Polygon'
        },
        {
            displayName: 'Hexagon',
            val: {
                '@NumberOfSides': 6
            },
            type: 'Polygon'
        },
        {
            displayName: 'Octagon',
            val: {
                '@NumberOfSides': 8
            },
            type: 'Polygon'
        },
        {
            displayName: '3-Point Star',
            type: 'Star'
        },
        {
            displayName: '4-Point Star',
            val: {
                '@StarPointCount': 4
            },
            type: 'Star'
        },
        {
            displayName: '5-Point Star',
            val: {
                '@StarPointCount': 5
            },
            type: 'Star'
        },
        {
            displayName: '6-Point Star',
            val: {
                '@StarPointCount': 6
            },
            type: 'Star'
        },
        {
            displayName: '8-Point Star',
            val: {
                '@StarPointCount': 8
            },
            type: 'Star'
        },
        {
            displayName: 'Vertical Line',
            angle: 0,
            type: 'Line'
        },
        {
            displayName: 'Horizontal Line',
            angle: 270,
            type: 'Line'
        },
        {
            displayName: 'Slant Line',
            angle: 135,
            type: 'Line'
        },
        {
            displayName: 'Backslant Line',
            angle: 225,
            type: 'Line'
        },
        {
            displayName: 'Cross',
            type: 'Cross'
        },
        {
            displayName: 'Bracket',
            type: 'Bracket'
        },
        {
            displayName: 'Brace',
            type: 'Brace'
        }
    ];
    return XRShapeViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRShapeViewModel = XRShapeViewModel;
var XRShapeControlSurface = (function (_super) {
    __extends(XRShapeControlSurface, _super);
    function XRShapeControlSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        var func = null;
        _this._disposables.push(_this.imageSrc = ko.pureComputed(function () {
            return _reportRenderingService_1.ReportRenderingService.getShapeImage(_this);
        }));
        _this.template = 'dxrd-shape';
        _this.contenttemplate = 'dxrd-shape-content';
        return _this;
    }
    return XRShapeControlSurface;
}(xrControl_1.XRControlSurface));
exports.XRShapeControlSurface = XRShapeControlSurface;
