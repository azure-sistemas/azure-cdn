﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_eventProcessor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../../settings");
var _mobileSearch_1 = require("./_mobileSearch");
var constants_1 = require("../../constants");
var $ = require("jquery");
var gallery_1 = require("devextreme/ui/gallery");
exports.slowdownDisctanceFactor = 2.5;
exports.minScale = 0.92;
function setTransform($element, transform) {
    $element.css({
        '-webkit-transform': transform,
        'transform': transform
    });
}
var EventProcessor = (function () {
    function EventProcessor(element, slideOptions) {
        var _this = this;
        this.element = element;
        this.slideOptions = slideOptions;
        this._direction = {
            vertical: false,
            horizontal: false,
            scrollDown: false
        };
        this.isLeftMove = false;
        this.isRightMove = false;
        this.$window = $(window);
        this.$element = $(element),
            this.$body = $(document.body),
            this.$gallery = this.$element.find('.dxrd-mobile-gallery');
        this.$galleryblocks = this.$gallery.find('.dxrd-gallery-blocks');
        this.firstMobilePageOffset = this._getFirstPageOffset();
        this.slideOptions.searchPanel.height.subscribe(function (newVal) {
            if (slideOptions.disabled())
                return;
            if (!_this.firstMobilePageOffset)
                _this.firstMobilePageOffset = _this._getFirstPageOffset();
            if (_this.slideOptions.readerMode) {
                _this.slideOptions.topOffset(newVal);
            }
            else {
                _this.slideOptions.topOffset(Math.min(newVal, Math.max(0, _mobileSearch_1.MobileSearchViewModel.maxHeight - _this.firstMobilePageOffset.top)));
            }
            if (!newVal) {
                _this.applySearchAnimation(newVal);
            }
            else if (newVal === _mobileSearch_1.MobileSearchViewModel.maxHeight) {
                _this.slideOptions.searchPanel.searchPanelVisible(true);
                _this.applySearchAnimation(newVal);
            }
            else {
                var dif = 1 - exports.minScale;
                var perc = newVal / _mobileSearch_1.MobileSearchViewModel.maxHeight;
                var scale = 1 - dif * perc;
                setTransform(_this.$galleryblocks, 'scale(' + Math.max(exports.minScale, scale) + ')');
            }
        });
    }
    EventProcessor.prototype._getFirstPageOffset = function () {
        return this.$galleryblocks.find('.dxrd-mobile-page').eq(0).offset();
    };
    EventProcessor.prototype.getDirection = function (x, y) {
        var differenceY = y - this._startingPositionY;
        var distanceY = Math.abs(differenceY);
        var distanceX = Math.abs(x - this._startingPositionX);
        if (distanceY === 0 && distanceX === 0) {
            this._direction.horizontal = false;
            this._direction.vertical = false;
            return this._direction;
        }
        var tg = !distanceX ? 10 : distanceY / distanceX;
        if (tg < 2) {
            this._direction.horizontal = true;
            this._direction.vertical = false;
            this._direction.scrollDown = false;
        }
        else {
            this._direction.horizontal = false;
            this._direction.vertical = true;
            this._direction.scrollDown = differenceY > 0;
        }
        return this._direction;
    };
    EventProcessor.prototype.setPosition = function (x, y) {
        this.isLeftMove = this.latestX > x;
        this.isRightMove = this.latestX < x;
        this.latestY = y;
        this.latestX = x;
    };
    EventProcessor.prototype.initialize = function (x, y) {
        this._startingPositionX = x;
        this._startingPositionY = y;
        this.latestX = x;
        this.latestY = y;
        this._direction = { horizontal: false, vertical: false, scrollDown: false };
    };
    EventProcessor.prototype.start = function (e) {
        this.$body.addClass('dxrd-prevent-refresh');
        this.$galleryblocks = this.$gallery.find('.dxrd-gallery-blocks');
        if (!this.slideOptions.topOffset()) {
            this.firstMobilePageOffset = this._getFirstPageOffset();
            if (this.firstMobilePageOffset) {
                this.firstMobilePageOffset.top = this.firstMobilePageOffset.top * exports.minScale;
            }
        }
        this.initialize(e.pageX, e.pageY);
    };
    EventProcessor.prototype.move = function (e) {
        if (this.slideOptions.zoomUpdating() || this.slideOptions.galleryIsAnimated() || this.slideOptions.disabled()) {
            return;
        }
        if (settings_1.SearchAvailable() && !this.slideOptions.searchPanel.editorVisible()) {
            var direction = this.getDirection(e.pageX, e.pageY);
            if (!direction.vertical && !direction.horizontal)
                return;
            if (direction.vertical && direction.scrollDown || this.slideOptions.searchPanel.height() !== 0) {
                if (this.slideOptions.reachedTop() && (_mobileSearch_1.MobileSearchViewModel.maxHeight + this.$element.offset().top) > this.$window.scrollTop()) {
                    this.slideOptions.brickEventsDisabled(true);
                    e.stopPropagation();
                    var currentHeight = this.slideOptions.searchPanel.height();
                    var difference = currentHeight + (e.clientY - this.latestY) / exports.slowdownDisctanceFactor;
                    var distance = difference > 0 ? Math.min(difference, _mobileSearch_1.MobileSearchViewModel.maxHeight) : 0;
                    this.slideOptions.searchPanel.height(distance);
                }
            }
        }
        this.setPosition(e.clientX, e.clientY);
    };
    EventProcessor.prototype.end = function (e) {
        var _this = this;
        if (this.slideOptions.zoomUpdating() || this.slideOptions.galleryIsAnimated()) {
            var touches = e['touches'];
            if (!touches || touches.length === 0) {
                if (this.slideOptions.zoomUpdating()) {
                    e.stopPropagation();
                }
                this.slideOptions.zoomUpdating(false);
            }
            return;
        }
        var direction = this.getDirection(e.pageX, e.pageY);
        if (this.slideOptions.scrollAvailable()) {
            if (direction.horizontal && this.slideOptions.swipeEnabled()) {
                var galleryInstance = gallery_1.default.getInstance(this.$gallery.get(0));
                var repaintTimeout = this.slideOptions.repaintTimeout;
                if (this.slideOptions.reachedLeft() && this.isRightMove && galleryInstance.gallery.swipeLeftEnable()) {
                    galleryInstance.prevItem();
                    clearTimeout(repaintTimeout());
                    repaintTimeout(setTimeout(function () { return galleryInstance.repaint(); }, 410));
                }
                else if (this.slideOptions.reachedRight() && this.isLeftMove && galleryInstance.gallery.swipeRightEnable()) {
                    galleryInstance.nextItem();
                    clearTimeout(repaintTimeout());
                    repaintTimeout(setTimeout(function () { return galleryInstance.repaint(); }, 410));
                }
            }
        }
        if (settings_1.SearchAvailable() && !this.slideOptions.searchPanel.editorVisible()) {
            if (this.slideOptions.searchPanel.height() >= _mobileSearch_1.MobileSearchViewModel.maxHeight / 2) {
                this.slideOptions.searchPanel.height(_mobileSearch_1.MobileSearchViewModel.maxHeight);
            }
            else {
                this.slideOptions.searchPanel.height(0);
            }
            if (this.slideOptions.searchPanel.height() == _mobileSearch_1.MobileSearchViewModel.maxHeight) {
                this.slideOptions.autoFitBy(constants_1.ZoomAutoBy.PageWidth);
            }
        }
        this.$body.removeClass('dxrd-prevent-refresh');
        setTimeout(function () { _this.slideOptions.brickEventsDisabled(false); }, 10);
    };
    EventProcessor.prototype.applySearchAnimation = function (value) {
        var _this = this;
        if (this.slideOptions.animationSettings.zoomEnabled()) {
            this.$galleryblocks.addClass('dxrdp-animation');
            this.$element.addClass('dxrdp-animation');
            setTimeout(function () {
                _this.$galleryblocks.removeClass('dxrdp-animation');
                _this.$element.removeClass('dxrdp-animation');
            }, 410);
        }
        setTransform(this.$galleryblocks, !value ? '' : 'scale(0.92)');
    };
    return EventProcessor;
}());
exports.EventProcessor = EventProcessor;
