﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryModel.js)
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
var _utils_1 = require("../../../internal/_utils");
var settings_1 = require("../../../settings");
var constants_1 = require("../../../constants");
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var GalleryModel = (function (_super) {
    __extends(GalleryModel, _super);
    function GalleryModel(preview, previewWrapperSize) {
        var _this = _super.call(this) || this;
        _this.preview = preview;
        _this.previewWrapperSize = previewWrapperSize;
        _this._spacing = 1;
        _this._animationTimeout = null;
        _this.repaint = ko.observable({});
        _this.repaintTimeout = ko.observable();
        _this.horizontal = ko.observable(1);
        _this.vertical = ko.observable(1);
        _this.pageCount = 0;
        _this.isAnimated = ko.observable(false);
        _this.items = ko.observableArray([{ blocks: ko.observableArray([]) }, { blocks: ko.observableArray([]) }, { blocks: ko.observableArray([]) }]);
        _this.currentBlockText = ko.observable('');
        _this.selectedIndexReal = ko.observable(0);
        _this.selectedIndex = ko.observable(0);
        var oldIndex = _this.selectedIndex();
        _this._disposables.push(_this.contentSize = ko.pureComputed(function () {
            var blocks = _this.items()[_this.selectedIndex()].blocks();
            var width, height;
            if (blocks.length === 1) {
                var block = blocks[0];
                var position = block.position();
                width = Math.max(position.width, block.page.width());
                height = Math.max(position.height, block.page.height());
            }
            return { width: width ? width + 'px' : 'auto', height: height ? height + 'px' : 'auto' };
        }));
        _this.animationEnabled = preview.animationSettings.swipeEnabled;
        var _calcHorizontalVertical = function () {
            var _zoom = preview._zoom();
            var pageHeight = Math.ceil(preview._pageHeight() * _utils_1.getCurrentResolution(_zoom) / settings_1.previewDefaultResolution());
            var pageWidth = Math.ceil(preview._pageWidth() * _utils_1.getCurrentResolution(_zoom) / settings_1.previewDefaultResolution());
            var _containerSize = previewWrapperSize();
            var horizontal = (preview.autoFitBy() != constants_1.ZoomAutoBy.PageWidth && (Math.floor(_containerSize.width / (pageWidth + 2 * _this._spacing)))) || 1;
            var vertical = Math.floor(_containerSize.height / (pageHeight + 2 * _this._spacing)) || 1;
            _this.horizontal(horizontal);
            _this.vertical(vertical);
        };
        var updateGalleryContent = function () {
            _calcHorizontalVertical();
            _this.pageCount = _this.horizontal() * _this.vertical();
            _this.updateContent(preview, _this.pageCount);
        };
        _this._disposables.push(previewWrapperSize.subscribe(function () {
            _this.items().forEach(function (item) { return item.blocks().forEach(function (block) { return block.repaint = true; }); });
            updateGalleryContent();
            var currentGalleryItem = _this.items()[_this.selectedIndex()];
            _this.updateBlocks(currentGalleryItem, _this.pageCount, preview, _this.selectedIndexReal(), preview.animationSettings.zoomEnabled());
            _this.repaint.valueHasMutated();
        }));
        _this._disposables.push(preview.visiblePages.subscribe(function () {
            for (var i = 0; i < _this.items().length; i++) {
                _this.items()[i].blocks([]);
                _this.items()[i].realIndex = -1;
            }
            updateGalleryContent();
        }));
        _this._disposables.push(preview.pageIndex.subscribe(updateGalleryContent));
        _this._disposables.push(preview.zoomUpdating.subscribe(function (newVal) {
            if (newVal)
                return;
            clearTimeout(_this.repaintTimeout());
            _this.repaintTimeout(setTimeout(function () { return _this.repaint.valueHasMutated(); }, 410));
        }));
        _this._disposables.push(preview._zoom.subscribe(function () {
            _calcHorizontalVertical();
            var pageCount = _this.horizontal() * _this.vertical();
            if (_this.pageCount !== pageCount) {
                _this.pageCount = pageCount;
                _this.items().forEach(function (item) { return item.blocks().forEach(function (block) { return block.repaint = true; }); });
                _this.updateContent(preview, pageCount);
            }
            else if (_this.pageCount === 1) {
                var block = _this.items()[_this.selectedIndex()].blocks()[0];
                _this.items().forEach(function (item, index) {
                    if (index != _this.selectedIndex())
                        item.blocks().forEach(function (block) { return block.repaint = true; });
                });
                setTimeout(function () {
                    block.position({
                        left: block.position().left,
                        top: block.position().top,
                        height: Math.max(_this.previewWrapperSize().height, block.page.height()),
                        width: Math.max(_this.previewWrapperSize().width, block.page.width())
                    });
                });
            }
        }));
        _this._disposables.push(_this.selectedIndexReal.subscribe(function (newVal) {
            if (newVal >= 0) {
                _this.changePage(preview);
            }
            else if (newVal < 0) {
                _this.selectedIndexReal(0);
            }
        }));
        _this._disposables.push(_this.selectedIndex.subscribe(function (newVal) {
            var result = newVal - oldIndex;
            if (result === -2 || result === 1) {
                _this.selectedIndexReal(_this.selectedIndexReal() + 1);
            }
            else if (result === 2 || result === -1) {
                _this.selectedIndexReal(_this.selectedIndexReal() - 1);
            }
            oldIndex = newVal;
        }));
        _this._disposables.push(_this.swipeLeftEnable = ko.computed(function () {
            return _this.selectedIndexReal() !== 0;
        }));
        _this._disposables.push(_this.swipeRightEnable = ko.computed(function () {
            return _this.selectedIndexReal() != (Math.ceil(preview.visiblePages().length / (_this.horizontal() * _this.vertical())) - 1);
        }));
        return _this;
    }
    GalleryModel.prototype._createBlock = function (previewPage, className, visible) {
        previewPage.disableResolutionReduction = true;
        previewPage.maxZoom = 1;
        var classSet = {};
        if (this.animationEnabled() && this.pageCount > 1) {
            className && (classSet[className] = true);
            classSet['dxrdp-animation'] = true;
        }
        return {
            page: previewPage,
            visible: visible,
            classSet: classSet,
            position: ko.observable({ top: 0, left: 0, width: 0, height: 0 })
        };
    };
    GalleryModel.prototype.dispose = function () {
        clearTimeout(this.repaintTimeout());
        _super.prototype.dispose.call(this);
    };
    GalleryModel.prototype.updatePagesVisible = function (preview) {
        if (this.items()[this.selectedIndex()]) {
            var someActive = false;
            var pages = this.items()[this.selectedIndex()].blocks();
            if (pages.length > 0) {
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].page) {
                        pages[i].page.isClientVisible(true);
                        if (pages[i].page.active()) {
                            someActive = true;
                        }
                    }
                }
                if (!someActive) {
                    pages[0].page && preview.goToPage(pages[0].page.pageIndex);
                }
            }
        }
    };
    GalleryModel.prototype.updateCurrentBlock = function () {
        if (this.items()[this.selectedIndex()]) {
            var blocks = this.items()[this.selectedIndex()].blocks();
            if (blocks.length > 0) {
                if (blocks.length > 1) {
                    this.currentBlockText([blocks[0].page.pageIndex + 1, blocks[blocks.length - 1].page.pageIndex + 1].join(' - '));
                }
                else {
                    if (blocks[0].page) {
                        this.currentBlockText((this.preview.pageIndex() + 1).toString());
                    }
                }
            }
        }
    };
    GalleryModel.prototype.updateContent = function (preview, pagesCount) {
        var itemsCount = Math.ceil(preview.visiblePages().length / pagesCount);
        var pageIndex = 0;
        var isCurrentBlock = false;
        var realIndex = 0;
        for (var i = 0; i < itemsCount; i++) {
            for (var j = 0; j < pagesCount; j++) {
                if (preview.visiblePages()[pageIndex].active()) {
                    isCurrentBlock = true;
                    realIndex = i;
                    break;
                }
                pageIndex++;
                if (preview.visiblePages().length === pageIndex) {
                    break;
                }
            }
            if (isCurrentBlock)
                break;
        }
        if (this.selectedIndexReal() !== realIndex) {
            this.selectedIndexReal(realIndex);
        }
        else {
            this.changePage(preview);
        }
    };
    GalleryModel.prototype.updateBlockPositions = function (blocks, visible) {
        var height = this.previewWrapperSize().height / this.vertical();
        var width = this.previewWrapperSize().width / this.horizontal();
        for (var i = 0; i < blocks.length; i++) {
            var vertical = Math.floor((i) / this.horizontal());
            var horizontal = i - (this.horizontal() * vertical);
            var left = horizontal * width;
            if (blocks[i].visible === visible || blocks[i].visible === true) {
                blocks[i].position({
                    top: vertical * height,
                    left: left,
                    width: width,
                    height: height
                });
                blocks[i].visible = true;
            }
            else {
                blocks[i].position({
                    top: vertical * height,
                    left: blocks[i].classSet['left'] ? ((this.previewWrapperSize().width + left) * -1) : this.previewWrapperSize().width + left,
                    width: width,
                    height: height
                });
            }
        }
    };
    GalleryModel.prototype.updateStartBlocks = function (galleryItem, pages) {
        var currentBlockPages = galleryItem.blocks().map(function (x) { return x.page; });
        var firstPage = pages.indexOf(currentBlockPages[0]);
        if (firstPage !== -1) {
            for (var i = 0; i < firstPage; i++) {
                galleryItem.blocks.splice(i, 0, this._createBlock(pages[i], 'left', false));
            }
        }
        else {
            firstPage = currentBlockPages.indexOf(pages[0]);
            if (firstPage !== -1) {
                galleryItem.blocks.splice(0, firstPage);
            }
        }
        return firstPage;
    };
    GalleryModel.prototype.updateLastBlocks = function (galleryItem, pages) {
        var currentBlockPages = galleryItem.blocks().map(function (x) { return x.page; });
        var lastPage = pages.indexOf(currentBlockPages[currentBlockPages.length - 1]);
        if (lastPage === pages.length - 1) {
            return 0;
        }
        if (lastPage !== -1) {
            for (var i = lastPage + 1; i < pages.length; i++) {
                galleryItem.blocks.splice(i, 0, this._createBlock(pages[i], 'right', false));
            }
        }
        else {
            lastPage = currentBlockPages.indexOf(pages[pages.length - 1]);
            galleryItem.blocks.splice(lastPage + 1, currentBlockPages.length - lastPage);
        }
        return lastPage;
    };
    GalleryModel.prototype.updateBlocks = function (galleryItem, pagesCount, preview, index, useAnimation) {
        if (useAnimation === void 0) { useAnimation = false; }
        var blocks = galleryItem.blocks();
        if (galleryItem.realIndex !== index
            || (blocks.length !== pagesCount || blocks[0].page.pageIndex === -1)
            || blocks.some(function (x) { return x.repaint; })) {
            galleryItem.realIndex = index;
            clearTimeout(this._animationTimeout);
            var startIndex = pagesCount * index;
            if (startIndex < 0 || startIndex >= preview.visiblePages().length) {
                galleryItem.blocks([]);
                return;
            }
            var pages = [];
            for (var i = startIndex; i < startIndex + pagesCount; i++) {
                if (i >= preview.visiblePages().length) {
                    break;
                }
                pages.push(preview.visiblePages()[i]);
            }
            var first = this.updateStartBlocks(galleryItem, pages);
            var last = this.updateLastBlocks(galleryItem, pages);
            if (first === -1 && last === -1) {
                galleryItem.blocks([]);
                for (var i = 0; i < pages.length; i++) {
                    galleryItem.blocks.splice(i, 0, this._createBlock(pages[i], null, true));
                }
            }
            this.updateBlockPositions(galleryItem.blocks(), true);
            var self = this;
            if (useAnimation) {
                this._animationTimeout = setTimeout(function () {
                    self.updateBlockPositions(galleryItem.blocks(), false);
                }, 400);
            }
            else {
                self.updateBlockPositions(galleryItem.blocks(), false);
            }
        }
    };
    GalleryModel.prototype.changePage = function (preview) {
        var pagesCount = this.horizontal() * this.vertical();
        var itemsCount = Math.ceil(preview.visiblePages().length / pagesCount);
        if (this.selectedIndex() === this.items().length - 1) {
            this.updateBlocks(this.items()[0], pagesCount, preview, this.selectedIndexReal() + 1);
            this.updateBlocks(this.items()[1], pagesCount, preview, this.selectedIndexReal() - 1);
        }
        else if (this.selectedIndex() === 0) {
            this.updateBlocks(this.items()[2], pagesCount, preview, this.selectedIndexReal() - 1);
            this.updateBlocks(this.items()[1], pagesCount, preview, this.selectedIndexReal() + 1);
        }
        else {
            this.updateBlocks(this.items()[0], pagesCount, preview, this.selectedIndexReal() - 1);
            this.updateBlocks(this.items()[2], pagesCount, preview, this.selectedIndexReal() + 1);
        }
        var currentGalleryItem = this.items()[this.selectedIndex()];
        this.updateBlocks(currentGalleryItem, pagesCount, preview, this.selectedIndexReal(), preview.animationSettings.zoomEnabled());
        if (!this.isAnimated()) {
            this.updatePagesVisible(preview);
        }
        this.updateCurrentBlock();
    };
    return GalleryModel;
}(analytics_utils_1.Disposable));
exports.GalleryModel = GalleryModel;
