﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_page.js)
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
var _brickUtils_1 = require("./_brickUtils");
var _previewRequestWrapper_1 = require("./_previewRequestWrapper");
var _utils_1 = require("../../common/utils/_utils");
var _previewSelection_1 = require("./_previewSelection");
var _utils_2 = require("./_utils");
var settings_1 = require("../settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var _previewEditingFieldsKeyboardHelper_1 = require("../accessibility/_previewEditingFieldsKeyboardHelper");
var PreviewPage = (function (_super) {
    __extends(PreviewPage, _super);
    function PreviewPage(preview, pageIndex, processClick, loading) {
        var _this = _super.call(this) || this;
        _this.isClientVisible = ko.observable(false);
        _this.originalHeight = ko.observable(0);
        _this.originalWidth = ko.observable(0);
        _this.loadingText = analytics_utils_1.getLocalization('Loading...', 'AnalyticsCoreStringId.Loading');
        _this.realZoom = ko.observable(1);
        _this.actualResolution = 0;
        _this.currentScaleFactor = ko.observable(1);
        _this.imageHeight = ko.observable(0);
        _this.imageWidth = ko.observable(0);
        _this.imageSrc = ko.observable('').extend({ rateLimit: { timeout: 100, method: 'notifyWhenChangesStop' } });
        _this.displayImageSrc = ko.observable('');
        _this.brick = ko.observable(null);
        _this.brickLoading = ko.observable(true);
        _this.bricks = ko.computed(function () {
            return _this.getBricksFlatList(_this.brick());
        });
        _this.activeBricks = ko.computed(function () {
            return _this.bricks().filter(function (x) { return x.active(); });
        });
        _this.clickableBricks = ko.computed(function () {
            return _this.bricks().filter(function (x) { return !!x.navigation; });
        });
        _this.active = ko.observable(false);
        _this.maxZoom = 0;
        _this.disableResolutionReduction = false;
        _this._lastZoom = 0;
        _this._selectedBrickPath = null;
        _this.pageIndex = pageIndex;
        _this.documentId = preview._currentDocumentId || ko.observable(null);
        _this._disposables.push(_this.imageSrc.subscribe(function (newVal) {
            var documentId = _this.documentId.peek();
            _this._lastGetPageDeferred && _this._lastGetPageDeferred.resolve(null);
            var currentGetPageDeferred = $.Deferred();
            currentGetPageDeferred
                .done(function (response) {
                if (!response)
                    return;
                _this.imageHeight(response.height);
                _this.imageWidth(response.width);
                _this.currentScaleFactor(_this._currentScaleFactor);
                _this.displayImageSrc('data:image/png;base64,' + response.base64string);
                _this._onPageLoaded(response, processClick, preview._editingFields);
            }).fail(function (_e) {
                _this._onPageLoadFailed();
            });
            var ignoreError = preview._closeDocumentRequests && (function () { return preview._closeDocumentRequests[documentId] || currentGetPageDeferred.state() != 'pending'; });
            _previewRequestWrapper_1.PreviewRequestWrapper.getPage(newVal, ignoreError)
                .done(function (response) {
                currentGetPageDeferred.resolve(response);
            }).fail(function (_e) {
                currentGetPageDeferred.reject(_e);
            });
            _this._lastGetPageDeferred = currentGetPageDeferred;
        }));
        var unifier = ko.isObservable(preview._unifier) ? preview._unifier : ko.observable(preview._unifier || _utils_1.generateGuid());
        _this.pageLoading = loading || ko.observable(true);
        _this.originalHeight(ko.unwrap(preview._pageHeight));
        _this.originalWidth(ko.unwrap(preview._pageWidth));
        _this.zoom = preview._zoom;
        _this.imageWidth(_this.originalWidth() * _this._getPixelRatio());
        _this.imageHeight(_this.originalHeight() * _this._getPixelRatio());
        _this._disposables.push(_this.isClientVisible.subscribe(function (newVal) {
            if (newVal) {
                _this._setPageImgSrc(_this.documentId(), unifier(), _this.zoom());
            }
        }));
        _this.color = ko.isObservable(preview._pageBackColor) ? preview._pageBackColor.peek() : '';
        _this.width = ko.pureComputed(function () {
            return _this.imageWidth() * _this.zoom() / _this.currentScaleFactor() / _this._getPixelRatio();
        }).extend({ deferred: true });
        _this.height = ko.pureComputed(function () {
            return _this.imageHeight() * _this.zoom() / _this.currentScaleFactor() / _this._getPixelRatio();
        }).extend({ deferred: true });
        _this.isEmpty = pageIndex === -1 && !_this.brick() && !processClick;
        _this.resetBrickRecusive = function (brick) {
            if (brick && brick.active) {
                brick.active(false);
                if (brick.bricks) {
                    brick.bricks.forEach(function (childBrick) { _this.resetBrickRecusive(childBrick); });
                }
            }
        };
        _this.selectBrick = function (path, ctrlKey) {
            if (_previewSelection_1.PreviewSelection.started)
                return;
            processClick && processClick(null);
            var currentBrick = _this.brick();
            !ctrlKey && _this.resetBrickRecusive(currentBrick);
            if (!path) {
                return;
            }
            if (!currentBrick) {
                _this._selectedBrickPath = path;
                return;
            }
            var pathElements = path.split(',');
            pathElements.forEach(function (el) {
                currentBrick = currentBrick.bricks[parseInt(el)];
            });
            currentBrick.active(true);
        };
        _this._disposables.push(ko.computed(function () {
            if (!_this.active()) {
                _this.resetBrickRecusive(_this.brick());
                _this._selectedBrickPath = null;
            }
        }));
        _this.editingFieldsKeyboardHelper = new _previewEditingFieldsKeyboardHelper_1.PreviewEditingFieldsKeyboardHelper();
        _this._disposables.push(_this.editingFieldsKeyboardHelper);
        return _this;
    }
    PreviewPage.prototype._initializeEditingFields = function (editingFieldBricks, previewEditngFields, originalWidth, originalHeight) {
        var _this = this;
        if (this.editingFields) {
            var oldEditFields = ko.unwrap(this.editingFields());
            if (oldEditFields && oldEditFields.length > 0) {
                oldEditFields.forEach(function (field) { return field.dispose && field.dispose(); });
            }
            this.editingFields.dispose();
        }
        this.editingFields = ko.pureComputed(function () {
            if (!previewEditngFields || editingFieldBricks.length === 0) {
                return [];
            }
            var allEditingFields = previewEditngFields();
            var pageFieldViewModels = [];
            for (var i = 0; i < editingFieldBricks.length; i++) {
                var brick = editingFieldBricks[i];
                var editingField = allEditingFields[brick.efIndex - 1];
                if (!editingField)
                    return [];
                pageFieldViewModels.push(editingField.createViewModel(_this.zoom, originalWidth, originalHeight, function () { return allEditingFields; }, brick.absoluteBounds));
                brick.text = (function (brick) { return (function () { return _brickUtils_1.brickText(brick, function () { return allEditingFields; }); }); })(brick);
            }
            return pageFieldViewModels;
        });
    };
    PreviewPage.prototype._getPixelRatio = function () {
        return window['devicePixelRatio'] || 1;
    };
    PreviewPage.prototype._onPageLoaded = function (result, processClick, previewEditingFields) {
        if (this._isDisposed)
            return;
        this.pageLoading(false);
        try {
            if (!result || !result.brick) {
                return;
            }
            this.brickColumnWidthArray = result.columnWidthArray;
            this.originalWidth(result.brick.width);
            this.originalHeight(result.brick.height);
            var editignFieldBricks = [];
            this.initializeBrick(result.brick, processClick, this.zoom, editignFieldBricks);
            this._initializeEditingFields(editignFieldBricks, previewEditingFields, result.brick.width, result.brick.height);
            this._selectedBrickPath && this.selectBrick(this._selectedBrickPath);
        }
        finally {
            this.brickLoading(false);
        }
    };
    PreviewPage.prototype._onPageLoadFailed = function () {
        if (this._isDisposed)
            return;
        if (this.isClientVisible()) {
            this.pageLoading(false);
            this.pageIndex !== -1 && this.brickLoading(false);
        }
    };
    PreviewPage.prototype.updateSize = function (zoom) {
        var newResolution = _utils_2.getCurrentResolution(zoom);
        this.realZoom(newResolution / settings_1.previewDefaultResolution());
        return newResolution;
    };
    PreviewPage.prototype.clearBricks = function () {
        this.brickLoading(true);
    };
    PreviewPage.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._isDisposed = true;
    };
    PreviewPage.prototype._setPageImgSrc = function (documentId, unifier, zoom) {
        if (!documentId || this.pageIndex === -1) {
            return;
        }
        if (this.maxZoom && this.maxZoom < zoom) {
            zoom = this.maxZoom;
        }
        if (this._lastZoom < zoom) {
            this._lastZoom = zoom;
        }
        else {
            if (this.actualResolution && this.disableResolutionReduction && this.imageSrc())
                return;
        }
        var newResolution = this.updateSize(zoom);
        if ((this.actualResolution === newResolution || newResolution < 9) && this.imageSrc()) {
            return;
        }
        this.actualResolution = newResolution;
        this._currentScaleFactor = zoom;
        var imageResolution = Math.floor(newResolution * this._getPixelRatio());
        this.imageSrc(settings_1.HandlerUri() +
            '?actionKey=getPage&unifier=' + unifier +
            '&arg=' + encodeURIComponent(JSON.stringify({ pageIndex: this.pageIndex, documentId: documentId, resolution: imageResolution, includeBricks: this.brickLoading() })));
    };
    PreviewPage.prototype._clear = function () {
        this.pageIndex = -1;
        this.isClientVisible(false);
        this._setPageImgSrc(null, null, 1);
        this.actualResolution = 0;
    };
    PreviewPage.prototype.initializeBrick = function (brick, processClick, zoom, editingFieldBricks) {
        _brickUtils_1.initializeBrick(brick, processClick, this.zoom, editingFieldBricks);
        _brickUtils_1.updateBricksPosition(brick, brick.height, brick.width);
        this.brick(brick);
    };
    PreviewPage.prototype.clickToBrick = function (s, e) {
        var target = $(e.currentTarget);
        var offset = target.offset();
        var xPerc = (e.clientX - offset.left + window.scrollX) / target.width() * 100;
        var yPerc = (e.clientY - offset.top + window.scrollY) / target.height() * 100;
        var bricks = s.bricks();
        for (var i = 0; i < bricks.length; i++) {
            if (parseFloat(bricks[i].topP) < yPerc && parseFloat(bricks[i].topP) + parseFloat(bricks[i].heightP) > yPerc
                && parseFloat(bricks[i].leftP) < xPerc && parseFloat(bricks[i].leftP) + parseFloat(bricks[i].widthP) > xPerc) {
                bricks[i].onClick && bricks[i].onClick(e);
                break;
            }
        }
    };
    PreviewPage.prototype.getBricksFlatList = function (brick) {
        if (brick) {
            var bricks = [];
            var innerBricksLength = brick.bricks && brick.bricks.length || 0;
            for (var i = 0; i < innerBricksLength; i++) {
                bricks = bricks.concat(this.getBricksFlatList(brick.bricks[i]));
            }
            bricks.push(brick);
            return bricks;
        }
        return [];
    };
    return PreviewPage;
}(analytics_utils_1.Disposable));
exports.PreviewPage = PreviewPage;
