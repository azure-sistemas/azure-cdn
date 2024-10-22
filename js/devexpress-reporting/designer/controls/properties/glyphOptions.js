﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\glyphOptions.js)
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
var checkEditingField_1 = require("../../../viewer/editing/models/checkEditingField");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var glyphOptions_1 = require("../metadata/properties/glyphOptions");
var glyphsInfo_1 = require("./glyphsInfo");
var GlyphOptions = (function (_super) {
    __extends(GlyphOptions, _super);
    function GlyphOptions(model, serializer) {
        var _this = _super.call(this) || this;
        _this.getInfo = ko.observable(glyphOptions_1.glyphOptionsSerializationInfo);
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model || {});
        var _currentCheckState = checkEditingField_1.GlyphStyle[_this.style()];
        _this._disposables.push(_this.style.subscribe(function (newStyle) {
            if (newStyle) {
                var oldDefSize = glyphsInfo_1.getDefaultCheckSize(_currentCheckState);
                var newDefSize = glyphsInfo_1.getDefaultCheckSize(checkEditingField_1.GlyphStyle[newStyle]);
                _currentCheckState = checkEditingField_1.GlyphStyle[newStyle];
                if (oldDefSize.height() === _this.size.height()) {
                    _this.size.height(newDefSize.height());
                }
                if (oldDefSize.width() === _this.size.width()) {
                    _this.size.width(newDefSize.width());
                }
            }
        }));
        return _this;
    }
    GlyphOptions.unitProperties = ['size'];
    return GlyphOptions;
}(analytics_utils_1.Disposable));
exports.GlyphOptions = GlyphOptions;
