﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportSnapLinesCollector.js)
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
var xrDetailReportBand_1 = require("../../bands/xrDetailReportBand");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ReportSnapLinesCollector = (function (_super) {
    __extends(ReportSnapLinesCollector, _super);
    function ReportSnapLinesCollector(_rtl) {
        var _this = _super.call(this) || this;
        _this._rtl = _rtl;
        return _this;
    }
    ReportSnapLinesCollector.prototype._getCollection = function (parent) {
        if (parent['controls'] && parent['controls']().length > 0) {
            return parent['controls']();
        }
        else if (parent['rows']) {
            return parent['rows']();
        }
        else if (parent['cells']) {
            return parent['cells']();
        }
    };
    ReportSnapLinesCollector.prototype._enumerateBandCollection = function (bandsHolder, parentAbsoluteProsition, callback) {
        var collection = bandsHolder.bands();
        for (var i = 0; i < collection.length; i++) {
            var itemRect = collection[i].getUsefulRect();
            var itemAbsoluteRect = this._processBandRtl({
                top: collection[i].absolutePosition.y(),
                bottom: collection[i].absolutePosition.y() + collection[i].height(),
                left: itemRect.left + parentAbsoluteProsition.left,
                right: itemRect.right + parentAbsoluteProsition.left
            });
            if (collection[i] instanceof xrDetailReportBand_1.DetailReportBandSurface) {
                this._enumerateBandCollection(collection[i].bandsHolder, itemAbsoluteRect, callback);
            }
            else {
                callback(collection[i], itemAbsoluteRect);
            }
        }
        if (bandsHolder.verticalBandsContainer && !bandsHolder.verticalBandsContainer.scrollOffset()) {
            bandsHolder.verticalBandsContainer.verticalBands().forEach((function (band) {
                var absoluteRect = {
                    top: band.absolutePosition.y(),
                    bottom: band.absolutePosition.y() + band._height(),
                    left: band.absolutePosition.x() - band.verticalBandsContainer.scrollOffset(),
                    right: band.absolutePosition.x() + band.rect().width - band.verticalBandsContainer.scrollOffset()
                };
                callback(band, absoluteRect);
            }));
        }
    };
    ReportSnapLinesCollector.prototype._processBandRtl = function (itemAbsoluteRect) {
        if (this._rtl()) {
            itemAbsoluteRect.right = itemAbsoluteRect.left;
            itemAbsoluteRect.left = 0;
        }
        return itemAbsoluteRect;
    };
    ReportSnapLinesCollector.prototype._enumerateCollection = function (parent, parentAbsoluteProsition, callback) {
        if (parent.bandsHolder)
            this._enumerateBandCollection(parent.bandsHolder, parentAbsoluteProsition, callback);
        _super.prototype._enumerateCollection.call(this, parent, parentAbsoluteProsition, callback);
    };
    return ReportSnapLinesCollector;
}(analytics_internal_1.SnapLinesCollector));
exports.ReportSnapLinesCollector = ReportSnapLinesCollector;
