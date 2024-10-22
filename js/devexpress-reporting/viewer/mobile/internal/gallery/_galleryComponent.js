﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryComponent.js)
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
var $ = require("jquery");
require("devextreme/ui/gallery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var dxGalleryReportPreview = (function (_super) {
    __extends(dxGalleryReportPreview, _super);
    function dxGalleryReportPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    dxGalleryReportPreview.prototype.getComponentName = function () {
        return 'dxGallery';
    };
    dxGalleryReportPreview.prototype.ctor = function (element, options) {
        var _this = this;
        this._animationClassName = 'dxrdp-gallery-item-animation';
        this.blockItems = null;
        this.currentBlockItem = null;
        this.gallery = null;
        this.nextBlockItem = null;
        this.initializeBlockItems = function () {
            _this.blockItems = [];
            var $items = _this['_getAvailableItems']();
            for (var i = 0; i < $items.length; i++) {
                var left = parseFloat($items[i]['style'].left);
                left = isNaN(left) ? 0 : left;
                _this.blockItems.push({
                    element: $($items[i]),
                    left: left
                });
            }
        };
        this.initializeBlockItems();
        this.gallery = this['option']('gallery');
        var subscription = this.gallery.repaint.subscribe(function (newVal) {
            if (!_this.gallery.preview._hasActiveEditingFields()) {
                _this.repaint();
            }
        });
        analytics_internal_1.addDisposeCallback(element, function () {
            subscription.dispose();
        });
    };
    dxGalleryReportPreview.prototype.repaint = function () {
        analytics_internal_1._getSuper(this).repaint.apply(this);
        this.initializeBlockItems();
    };
    dxGalleryReportPreview.prototype._swipeStartHandler = function (e) {
        analytics_internal_1._getSuper(this)['_swipeStartHandler'].apply(this, [e]);
        var swipeRightEnable = this.gallery.swipeRightEnable();
        var swipeLeftEnable = this.gallery.swipeLeftEnable();
        if (!swipeRightEnable || !swipeLeftEnable) {
            var selectedIndex = swipeRightEnable ? 0 : 2;
            var startOffset = 3 - selectedIndex - 1, endOffset = selectedIndex;
            if (!swipeRightEnable && !swipeLeftEnable) {
                startOffset = 0;
                endOffset = 0;
            }
            e.event.maxLeftOffset = startOffset;
            e.event.maxRightOffset = endOffset;
        }
        this.gallery.isAnimated(true);
        if (this.gallery.animationEnabled()) {
            this.currentBlockItem && this.currentBlockItem.element.removeClass(this._animationClassName);
            this.nextBlockItem && this.nextBlockItem.element.removeClass(this._animationClassName);
        }
    };
    dxGalleryReportPreview.prototype._getNextIndex = function (offset) {
        var index = this.gallery.selectedIndex();
        if (offset < 0) {
            if (index === 2) {
                index = 0;
            }
            else {
                index++;
            }
        }
        else {
            if (index === 0) {
                index = 2;
            }
            else {
                index--;
            }
        }
        return index;
    };
    dxGalleryReportPreview.prototype._setSwipeAnimation = function (element, difference, offset, right) {
        var diffperc = 100 * offset / 4;
        var newLeft = '0%';
        if (right) {
            newLeft = (element.left + diffperc) + '%';
        }
        else {
            newLeft = (element.left - diffperc) + '%';
        }
        element.element.css({
            'opacity': difference,
            'transform': 'scale(' + difference + ')',
            'left': newLeft
        });
    };
    dxGalleryReportPreview.prototype._addAnimation = function (item) {
        if (item) {
            if (this.gallery.animationEnabled()) {
                item.element.addClass(this._animationClassName);
            }
        }
    };
    dxGalleryReportPreview.prototype._restoreDefault = function (item) {
        if (item) {
            item.element.css({
                'opacity': 1,
                'transform': 'scale(' + 1 + ')',
                'left': item.left + '%'
            });
        }
    };
    dxGalleryReportPreview.prototype._getItem = function (index, loopTest) {
        var realIndex = index;
        var currentBlockIndex = this.blockItems.indexOf(this.currentBlockItem);
        if (loopTest) {
            if (currentBlockIndex === 2 && index === 0) {
                realIndex = 3;
            }
            else if (currentBlockIndex === 0 && index === 2) {
                realIndex = 4;
            }
        }
        var item = this.blockItems[realIndex];
        if (this.gallery.animationEnabled()) {
            item.element.removeClass(this._animationClassName);
        }
        return item;
    };
    dxGalleryReportPreview.prototype._swipeUpdateHandler = function (e) {
        analytics_internal_1._getSuper(this)['_swipeUpdateHandler'].apply(this, [e]);
        var offset = e.event.offset;
        var nextIndex = this._getNextIndex(offset);
        var currentIndex = this.gallery.selectedIndex();
        var currentBlockIndex = this.blockItems.indexOf(this.currentBlockItem);
        var nextBlockIndex = this.blockItems.indexOf(this.nextBlockItem);
        if (!this.currentBlockItem || currentBlockIndex !== currentIndex) {
            this.currentBlockItem = this._getItem(currentIndex, false);
        }
        if (!this.nextBlockItem || nextBlockIndex !== nextIndex) {
            this.nextBlockItem = this._getItem(nextIndex, true);
        }
        if (this.gallery.animationEnabled()) {
            offset = Math.abs(offset);
            var right = (nextIndex - currentIndex === 1) || (currentIndex === 2 && nextIndex === 0);
            this._setSwipeAnimation(this.currentBlockItem, Math.min(1, (1 - offset)), offset, right);
            this._setSwipeAnimation(this.nextBlockItem, Math.min(1, offset * 1.5), offset, !right);
        }
    };
    dxGalleryReportPreview.prototype._swipeEndHandler = function (e) {
        analytics_internal_1._getSuper(this)['_swipeEndHandler'].apply(this, [e]);
        if (this.gallery.animationEnabled()) {
            for (var i = 0; i < this.blockItems.length; i++) {
                if (this.blockItems[i] === this.currentBlockItem || this.blockItems[i] === this.nextBlockItem) {
                    this._addAnimation(this.blockItems[i]);
                }
                this._restoreDefault(this.blockItems[i]);
            }
        }
        else {
            this.gallery.isAnimated(false);
            this.gallery.updatePagesVisible(this.gallery.preview);
        }
    };
    dxGalleryReportPreview.prototype._endSwipe = function () {
        analytics_internal_1._getSuper(this)['_endSwipe'].apply(this, arguments);
        this.gallery.isAnimated(false);
        this.gallery.updatePagesVisible(this.gallery.preview);
    };
    return dxGalleryReportPreview;
}(analytics_internal_1._dxtInherit));
exports.dxGalleryReportPreview = dxGalleryReportPreview;
analytics_internal_1._registerDxtComponent('dxGalleryReportPreview', dxGalleryReportPreview);
