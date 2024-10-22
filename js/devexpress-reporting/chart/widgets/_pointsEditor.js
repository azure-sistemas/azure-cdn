﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_pointsEditor.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var PointsEditor = (function (_super) {
    __extends(PointsEditor, _super);
    function PointsEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    PointsEditor.prototype.addPoint = function (model) {
        return _point_1.SeriesPointModel.createNew(model);
    };
    return PointsEditor;
}(analytics_widgets_1.Editor));
exports.PointsEditor = PointsEditor;
var _point_1 = require("../components/series/_point");
