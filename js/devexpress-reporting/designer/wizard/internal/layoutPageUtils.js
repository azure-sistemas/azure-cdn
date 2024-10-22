﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\layoutPageUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ReportLayout;
(function (ReportLayout) {
    ReportLayout[ReportLayout["stepped"] = 0] = "stepped";
    ReportLayout[ReportLayout["block"] = 1] = "block";
    ReportLayout[ReportLayout["outline1"] = 2] = "outline1";
    ReportLayout[ReportLayout["outline2"] = 3] = "outline2";
    ReportLayout[ReportLayout["alignLeft1"] = 4] = "alignLeft1";
    ReportLayout[ReportLayout["alignLeft2"] = 5] = "alignLeft2";
    ReportLayout[ReportLayout["columnar"] = 6] = "columnar";
    ReportLayout[ReportLayout["tabular"] = 7] = "tabular";
    ReportLayout[ReportLayout["justified"] = 8] = "justified";
})(ReportLayout = exports.ReportLayout || (exports.ReportLayout = {}));
var LayoutTypeItem = (function () {
    function LayoutTypeItem(textValue, textID, layoutType, margin) {
        this.layoutType = layoutType;
        this.margin = margin;
        this.text = analytics_utils_1.getLocalization(textValue, textID);
    }
    Object.defineProperty(LayoutTypeItem.prototype, "imageClassName", {
        get: function () {
            return 'dxrd-report-layout-type-image-' + ReportLayout[this.layoutType].toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    return LayoutTypeItem;
}());
exports.LayoutTypeItem = LayoutTypeItem;
var PageOrientation;
(function (PageOrientation) {
    PageOrientation[PageOrientation["Portrait"] = 0] = "Portrait";
    PageOrientation[PageOrientation["Landscape"] = 1] = "Landscape";
})(PageOrientation = exports.PageOrientation || (exports.PageOrientation = {}));
var PageOrientationItem = (function () {
    function PageOrientationItem(textValue, textID, orientation) {
        this.orientation = orientation;
        this.text = analytics_utils_1.getLocalization(textValue, textID);
    }
    return PageOrientationItem;
}());
exports.PageOrientationItem = PageOrientationItem;
