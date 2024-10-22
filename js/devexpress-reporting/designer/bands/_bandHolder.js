﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandHolder.js)
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
var BandsHolder = (function (_super) {
    __extends(BandsHolder, _super);
    function BandsHolder(_container) {
        var _this = _super.call(this) || this;
        _this._container = _container;
        _this.bands = ko.observableArray();
        if (_container instanceof xrReport_1.ReportSurface || _container instanceof xrDetailReportBand_1.DetailReportBandSurface)
            _this._disposables.push(_this.verticalBandsContainer = new _vericalBandContainer_1.VerticalBandsContainerSurface(_container));
        _this._disposables.push(_this.multiColumn = ko.computed(function () {
            var containerMultiColumn = _container['multiColumn'] && _container['multiColumn']();
            if (containerMultiColumn && containerMultiColumn.haveColumns()) {
                return containerMultiColumn;
            }
            else {
                var detailBand = _this.bands().filter(function (item) { return item instanceof xrDetailBand_1.DetailBandSurface; })[0];
                if (detailBand && detailBand.multiColumn() && detailBand.multiColumn().haveColumns())
                    return detailBand.multiColumn();
                else
                    return null;
            }
        }));
        return _this;
    }
    BandsHolder.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.bands);
        this.resetObservableArray(this.bands);
    };
    BandsHolder.prototype._createBandsMapCollection = function (elementModels, callbacks) {
        var position = 0;
        elementModels.peek().forEach(function (item) { return callbacks.addItem(callbacks.createItem(item), position++); });
        callbacks.callMutated();
        return elementModels.subscribe(function (args) {
            args.forEach(function (changeSet) {
                if (changeSet.status === 'deleted') {
                    callbacks.removeItem(changeSet.value.surface);
                    callbacks.callMutated();
                }
            });
            args.forEach(function (changeSet) {
                if (changeSet.status === 'added') {
                    callbacks.addItem(callbacks.createItem(changeSet.value), changeSet.index);
                    callbacks.callMutated();
                }
            });
        }, null, 'arrayChange');
    };
    BandsHolder.prototype._addHorizontalBand = function (item, index) {
        var verticalBandsPosition = this.verticalBandsContainer && this.verticalBandsContainer.bandPosition();
        if (index === undefined)
            return this.bands().push(item);
        if (verticalBandsPosition > 0 && index > verticalBandsPosition) {
            index -= this.verticalBandsContainer.verticalBands().length;
        }
        this.bands().splice(index, 0, item);
    };
    BandsHolder.prototype._addVerticalBand = function (item, index) {
        this.verticalBandsContainer.verticalBands().splice(index > 0 ? index : 0, 0, item);
    };
    BandsHolder.prototype.initialize = function (bands) {
        var _this = this;
        var isVerticalChanged = false;
        var isHorizontalChanged = false;
        this._disposables.push(this._createBandsMapCollection(bands, {
            addItem: function (item, index) {
                if (item instanceof xrVerticalBand_1.VerticalBandSurface) {
                    _this._addVerticalBand(item, index - _this.verticalBandsContainer.bandPosition());
                    isVerticalChanged = true;
                }
                else {
                    isHorizontalChanged = true;
                    _this._addHorizontalBand(item, index);
                }
            },
            callMutated: function () {
                isHorizontalChanged && _this.bands.valueHasMutated();
                isVerticalChanged && _this.verticalBandsContainer && _this.verticalBandsContainer.verticalBands.valueHasMutated();
                isHorizontalChanged = false;
                isVerticalChanged = false;
            },
            createItem: function (item) { return _this._container._createSurface(item); },
            removeItem: function (item) {
                if (item instanceof xrVerticalBand_1.VerticalBandSurface) {
                    _this.verticalBandsContainer.verticalBands().splice(_this.verticalBandsContainer.verticalBands().indexOf(item), 1);
                    isVerticalChanged = true;
                }
                else {
                    _this.bands().splice(_this.bands().indexOf(item), 1);
                    isHorizontalChanged = true;
                }
            }
        }));
    };
    BandsHolder.prototype.getHeight = function () {
        var minHeight = (this.verticalBandsContainer && this.verticalBandsContainer.height()) || 0;
        this.bands().forEach(function (band) { minHeight += band.height(); });
        return minHeight;
    };
    BandsHolder.prototype.getTotalHeight = function () {
        var height = this.verticalBandsContainer && this.verticalBandsContainer._height() || 0;
        return height + (this.bands() || []).reduce(function (acc, x) { return acc + x._totalHeight(); }, 0);
    };
    BandsHolder.prototype.getBandAbsolutePositionY = function (band) {
        var newY = 0;
        var bandIndex;
        var parentBands = ko.unwrap(this.bands);
        if (parentBands && parentBands.length !== 0) {
            bandIndex = parentBands.indexOf(band);
            if (bandIndex === -1)
                return newY;
            if (bandIndex > 0 && parentBands[bandIndex - 1]) {
                newY = parentBands[bandIndex - 1].absolutePosition.y() + parentBands[bandIndex - 1].height();
            }
            else if (bandIndex === 0 && this._container['absolutePosition']) {
                newY = this._container['absolutePosition'].y();
            }
            if (this.verticalBandsContainer) {
                if (bandIndex === this.verticalBandsContainer.getBandPosition()) {
                    newY = this.verticalBandsContainer.topOffset() + this.verticalBandsContainer.height();
                }
            }
        }
        return newY;
    };
    BandsHolder.prototype.checkUnderCursor = function () {
        var isOver = false;
        [this.bands(), this.verticalBandsContainer.verticalBands()].forEach(function (collection) {
            for (var i = 0; i < collection.length; i++) {
                isOver = collection[i].underCursor().isOver;
                if (isOver)
                    return isOver;
            }
        });
        return isOver;
    };
    return BandsHolder;
}(analytics_utils_1.Disposable));
exports.BandsHolder = BandsHolder;
var xrReport_1 = require("../controls/xrReport");
var xrDetailBand_1 = require("./xrDetailBand");
var xrDetailReportBand_1 = require("./xrDetailReportBand");
var xrVerticalBand_1 = require("./xrVerticalBand");
var _vericalBandContainer_1 = require("./_vericalBandContainer");
