﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\mobilePreview.js)
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
var reportPreview_1 = require("../reportPreview");
var constants_1 = require("../constants");
var _mobilePage_1 = require("./internal/_mobilePage");
var ko = require("knockout");
var MobileReportPreview = (function (_super) {
    __extends(MobileReportPreview, _super);
    function MobileReportPreview(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl, mobileSettings) {
        if (rtl === void 0) { rtl = false; }
        if (mobileSettings === void 0) { mobileSettings = { readerMode: true, animationEnabled: true }; }
        var _this = _super.call(this, handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl) || this;
        _this.availablePages = ko.observable(null);
        _this.visiblePages = ko.computed(function () {
            if (!_this.availablePages()) {
                return _this.pages();
            }
            else {
                return _this.pages().filter(function (x) { return _this.availablePages().indexOf(x.pageIndex) !== -1; });
            }
        });
        _this.topOffset = ko.observable(0);
        _this.previewWrapperSize = ko.observable({ width: 0, height: 0 });
        _this.searchPanelVisible = ko.observable(false);
        _this.actionsVisible = ko.observable(false);
        _this.scrollReachedLeft = ko.observable(false);
        _this.scrollReachedRight = ko.observable(false);
        _this.scrollReachedTop = ko.observable(true);
        _this.scrollReachedBottom = ko.observable(true);
        _this.zoomUpdating = ko.observable(false);
        _this.mobileZoom = ko.computed({
            read: function () {
                var currentZoom = _this.zoom();
                return currentZoom > 0 ? currentZoom : _this._zoom();
            },
            write: function (newVal) {
                _this.zoom(newVal);
            }
        });
        _this.readerMode = mobileSettings.readerMode;
        var globalAnimationEnabled = mobileSettings.animationEnabled;
        _this.animationSettings = { zoomEnabled: ko.observable(globalAnimationEnabled), swipeEnabled: ko.observable(globalAnimationEnabled) };
        _this.canSwitchToDesigner = false;
        _this.autoFitBy(constants_1.ZoomAutoBy.PageWidth);
        _this.showMultipagePreview(true);
        _this._disposables.push(_this.interactionDisabled = ko.pureComputed(function () { return _this.pages().length === 0; }), _this.searchPanelVisible.subscribe(function (newVal) {
            if (newVal) {
                _this.actionsVisible(false);
            }
        }));
        return _this;
    }
    MobileReportPreview.prototype.createPage = function (pageIndex, processClick, loading) {
        return new _mobilePage_1.MobilePreviewPage(this, pageIndex, processClick, loading);
    };
    MobileReportPreview.prototype.createBrickClickProcessor = function (cyclePageIndex) {
        var _this = this;
        var _clickHandler = _super.prototype.createBrickClickProcessor.call(this, cyclePageIndex);
        var func = function (brick) {
            if (_this.zoomUpdating())
                return;
            if (cyclePageIndex !== _this.pageIndex()) {
                _this.actionsVisible(false);
                var supscription = _this.actionsVisible.subscribe(function (newVal) {
                    supscription.dispose();
                    _this.actionsVisible(false);
                });
            }
            _clickHandler(brick);
        };
        return func;
    };
    MobileReportPreview.prototype._hasActiveEditingFields = function () {
        return this.visiblePages().some(function (p) {
            var pageEditFields = ko.unwrap(p.editingFields);
            return pageEditFields && pageEditFields.some(function (x) { return ko.unwrap(x.active); });
        });
    };
    MobileReportPreview.prototype.showActions = function (s) {
        if (s.zoomUpdating() || s.interactionDisabled())
            return;
        var searchVisible = s.searchPanelVisible();
        if (!searchVisible) {
            if (!this._hasActiveEditingFields()) {
                s.actionsVisible(!s.actionsVisible());
            }
        }
        else {
            s.searchPanelVisible(!searchVisible);
        }
    };
    MobileReportPreview.prototype.onSlide = function (e) {
        this.scrollReachedLeft(true);
        this.scrollReachedRight(true);
        if (this.autoFitBy() === constants_1.ZoomAutoBy.None && e.removedItems && e.removedItems[0].blocks().length === 1 && e.addedItems && e.addedItems[0].blocks().length === 1)
            this.autoFitBy(constants_1.ZoomAutoBy.PageWidth);
    };
    MobileReportPreview.prototype.goToPage = function (pageIndex, forcePage) {
        _super.prototype.goToPage.call(this, pageIndex, forcePage);
    };
    MobileReportPreview.prototype.getScrollViewOptions = function () {
        var _this = this;
        var options = {
            onUpdated: function (e) { _this.setScrollReached(e); },
            direction: 'both',
            pushBackValue: 0,
            bounceEnabled: false,
            disabled: this.zoomUpdating
        };
        return options;
    };
    MobileReportPreview.prototype.setScrollReached = function (e) {
        this.scrollReachedLeft(e.reachedLeft);
        this.scrollReachedRight(e.reachedRight);
        this.scrollReachedTop(e.reachedTop);
        this.scrollReachedBottom(e.reachedBottom);
    };
    MobileReportPreview.prototype.dispose = function () {
        this.mobileZoom.dispose();
        this.visiblePages.dispose();
        _super.prototype.dispose.call(this);
    };
    return MobileReportPreview;
}(reportPreview_1.ReportPreview));
exports.MobileReportPreview = MobileReportPreview;
