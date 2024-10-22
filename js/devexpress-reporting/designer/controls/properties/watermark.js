﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\watermark.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var WatermarkModel = (function (_super) {
    __extends(WatermarkModel, _super);
    function WatermarkModel(model, serializer) {
        var _this = _super.call(this, model || {}, serializer, watermark_1.watermarkSerializationsInfo) || this;
        _this.rtl = $.noop;
        if (!_this.imageSource() && model && model['@Image']) {
            _this.imageSource(new imageSource_1.ImageSource('img', model['@Image']));
            delete _this['_model']['@Image'];
        }
        return _this;
    }
    WatermarkModel.prototype.shouldDrawWatermarkImage = function () {
        return this.imageSource() && this.imageSource().sourceType !== 'svg';
    };
    return WatermarkModel;
}(analytics_elements_1.SerializableModel));
exports.WatermarkModel = WatermarkModel;
var imageSource_1 = require("../../../common/imageSource");
var watermark_1 = require("../metadata/properties/watermark");
