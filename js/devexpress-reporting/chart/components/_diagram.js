﻿/**
* DevExpress HTML/JS Reporting (chart\components\_diagram.js)
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
var _secondaryAxisViewModel_1 = require("./axis/_secondaryAxisViewModel");
var _additionalPane_1 = require("./models/_additionalPane");
var _diagram_1 = require("../internal/meta/_diagram");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var _utils_1 = require("../_utils");
var DiagramViewModel = (function (_super) {
    __extends(DiagramViewModel, _super);
    function DiagramViewModel(model, serializer) {
        return _super.call(this, model, serializer, _diagram_1.diagramSerializationsInfo) || this;
    }
    DiagramViewModel.createDiagram = function (model, type, serializer) {
        if (serializer === void 0) { serializer = new analytics_utils_1.ModelSerializer(); }
        var info = _diagram_1.diagramMapper[type].info;
        var newDiagram = {
            getInfo: function () {
                return info;
            }
        };
        serializer.deserialize(newDiagram, $.extend(model, { '@TypeNameSerializable': _diagram_1.diagramMapper[type].type }));
        if (info.filter(function (x) { return x.propertyName === _diagram_1.secondaryAxesX.propertyName; }).length > 0) {
            var createAxes = function (item, parent) { return new _secondaryAxisViewModel_1.SecondaryAxisViewModel(item, parent, serializer); };
            newDiagram.secondaryAxesX = _utils_1.deserializeModelArray(model && model.SecondaryAxesX, createAxes, _secondaryAxisViewModel_1.SecondaryAxisViewModel.xPrefix);
            newDiagram.secondaryAxesY = _utils_1.deserializeModelArray(model && model.SecondaryAxesY, createAxes, _secondaryAxisViewModel_1.SecondaryAxisViewModel.yPrefix);
        }
        if (info.filter(function (x) { return x.propertyName === _diagram_1.panes.propertyName; }).length > 0) {
            newDiagram.panes = _utils_1.deserializeModelArray(model && model.Panes, function (item, parent) { return new _additionalPane_1.AdditionalPaneViewModel(item, parent, serializer); }, _additionalPane_1.AdditionalPaneViewModel.prefix);
        }
        return newDiagram;
    };
    DiagramViewModel.from = function (model, serializer) {
        return new DiagramViewModel(model || {}, serializer);
    };
    DiagramViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, null, refs);
    };
    return DiagramViewModel;
}(analytics_elements_1.SerializableModel));
exports.DiagramViewModel = DiagramViewModel;
