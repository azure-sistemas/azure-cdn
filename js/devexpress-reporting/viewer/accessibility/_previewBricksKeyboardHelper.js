﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewBricksKeyboardHelper.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var PreviewBricksKeyboardHelper = (function (_super) {
    __extends(PreviewBricksKeyboardHelper, _super);
    function PreviewBricksKeyboardHelper(viewModel) {
        var _this = _super.call(this) || this;
        _this.controlElementClassName = 'dx-accessibility-page-item';
        _this.liveRegionId = 'dxrd-preview-bricks-live-region';
        _this._needFocusNext = false;
        _this._firstSelectedBrickIndex = 0;
        _this._lastSelectedBrickIndex = 0;
        _this._resetBricksIndexes = function () {
            _this._firstSelectedBrickIndex = 0;
            _this._lastSelectedBrickIndex = 0;
        };
        _this._resetBricks = function () {
            return _this._currentPage.selectBrick('');
        };
        _this.delayedInit = function () {
            _this._initTimeout && clearTimeout(_this._initTimeout);
            _this._initTimeout = setTimeout(function () {
                _this.initialize();
            }, 20);
        };
        _this.reset = function () {
            _this._resetBricks();
            _this._resetBricksIndexes();
        };
        _this.active = false;
        _this._getSelectedContent = viewModel.getSelectedContent;
        _this._pages = viewModel.pages;
        _this._goToPage = viewModel.goToPage.bind(viewModel);
        _this._usePageKeyboardNavigation = viewModel.showMultipagePreview;
        _this._disposables.push(viewModel.currentPage.subscribe(function (newPage) {
            if (newPage) {
                _this._currentPage = newPage;
                _this.delayedInit();
            }
        }));
        return _this;
    }
    PreviewBricksKeyboardHelper.prototype.dispose = function () {
        this._activeBricksSubscription && this._activeBricksSubscription.dispose();
        this._afterInitializeCallback = null;
        this._initTimeout && clearTimeout(this._initTimeout);
        _super.prototype.dispose.call(this);
    };
    PreviewBricksKeyboardHelper.prototype.initialize = function () {
        var _this = this;
        if (!this._currentPage)
            return;
        this._bricks = this._currentPage.bricks;
        if (this._usePageKeyboardNavigation()) {
            this.startIndex = this._pages().indexOf(this._currentPage);
        }
        else {
            this.startIndex = 0;
        }
        _super.prototype.initialize.call(this);
        this._afterInitializeCallback && this._afterInitializeCallback();
        this._afterInitializeCallback = null;
        if (this._needFocusNext) {
            this.controlElements[this.startIndex].element.focus();
            this.lastFocusItem().setAttribute('tabindex', '-1');
            this._needFocusNext = false;
        }
        this._activeBricksSubscription && this._activeBricksSubscription.dispose();
        this._activeBricksSubscription = this._currentPage.activeBricks.subscribe(function (activeBricks) {
            _this._liveRegionTimeout && clearTimeout(_this._liveRegionTimeout);
            if (!activeBricks.length)
                return;
            _this._liveRegionTimeout = _this.liveRegion().changeText(_this._getSelectedContent(','));
            var _bricks = _this._bricks();
            for (var i = 0; i < _bricks.length; i++) {
                var brick = _bricks[i];
                if (brick === activeBricks[0])
                    _this._firstSelectedBrickIndex = i;
                if (brick === activeBricks[activeBricks.length - 1]) {
                    _this._lastSelectedBrickIndex = i;
                    break;
                }
            }
        });
    };
    PreviewBricksKeyboardHelper.prototype.clickHandler = function () { };
    PreviewBricksKeyboardHelper.prototype.itemHandleEscKey = function (e, index) {
        if (!this.active)
            return false;
        this.controlElements[index].element.classList.remove('dx-accessibility-active-state');
        this.active = false;
        this._resetBricks();
        return true;
    };
    PreviewBricksKeyboardHelper.prototype._actionExecute = function (brick, e) {
        var _this = this;
        if (brick.navigation) {
            brick.onClick(e);
        }
        else if (brick.efIndex) {
            var editField = this._currentPage.editingFields()[brick.efIndex - 1];
            var efItems = Array.prototype.slice.call(e.target.querySelectorAll('.dx-accessibility-editing-field-item'));
            var efItem = analytics_internal_1.findFirstItemMatchesCondition(efItems, function (item) { return ko.dataFor(item) === editField; });
            if (efItem && editField.activateEditor) {
                editField.activateEditor(editField, { target: efItem, currentTarget: efItem });
                var subscription = editField.active.subscribe(function (value) {
                    if (!value) {
                        if (document.activeElement === document.body) {
                            e.target.focus();
                        }
                        brick.active(true);
                        _this.active = true;
                        e.target.classList.add('dx-accessibility-active-state');
                        subscription.dispose();
                    }
                });
                this._disposables.push(subscription);
            }
            else if (editField.onClick) {
                editField.onClick(editField, e);
            }
        }
    };
    PreviewBricksKeyboardHelper.prototype._getNonEmptyBrick = function (index, reverse) {
        var nextIndex = index + (reverse ? -1 : 1);
        var _bricks = this._bricks();
        var brick = _bricks[nextIndex];
        if (reverse && nextIndex < 0 || nextIndex > _bricks.length - 1) {
            brick = this._getNonEmptyBrick(reverse ? _bricks.length : -1, reverse);
        }
        if (brick.efIndex && brick.efIndex > 0)
            return brick;
        else if (brick.accessibleDescription || brick.text() || brick.efIndex || brick.navigation)
            return brick;
        return this._getNonEmptyBrick(nextIndex, reverse);
    };
    PreviewBricksKeyboardHelper.prototype._pageChangeHandle = function (action, newIndex, reverse) {
        if (reverse === void 0) { reverse = false; }
        this._needFocusNext = true;
        this.reset();
        if (!this.active) {
            if (this._usePageKeyboardNavigation())
                return action();
            else {
                var lastFocusItem = this.lastFocusItem();
                lastFocusItem.setAttribute('tabindex', '0');
                lastFocusItem.focus();
                return false;
            }
        }
        this._getNonEmptyBrick(newIndex, reverse).active(true);
        return true;
    };
    PreviewBricksKeyboardHelper.prototype._activatePage = function (e, index) {
        if (this._bricks().length) {
            var page = this.controlElements[index];
            this.active = true;
            page.element.classList.add('dx-accessibility-active-state');
            var lastBrick = this._getNonEmptyBrick(this._lastSelectedBrickIndex - 1, false);
            lastBrick && lastBrick.active(true);
        }
    };
    PreviewBricksKeyboardHelper.prototype.itemHandleHomeKey = function (e, index) {
        var _this = this;
        return this._pageChangeHandle(function () { return _super.prototype.itemHandleHomeKey.call(_this, e, index); }, -1);
    };
    PreviewBricksKeyboardHelper.prototype.itemHandleEndKey = function (e, index) {
        var _this = this;
        return this._pageChangeHandle(function () { return _super.prototype.itemHandleEndKey.call(_this, e, index); }, this._bricks().length, true);
    };
    PreviewBricksKeyboardHelper.prototype.itemHandleLeftArrowKey = function (e, index) {
        var _this = this;
        return this._pageChangeHandle(function () {
            _this.setFocusToPrevious(index);
            return true;
        }, this._firstSelectedBrickIndex, true);
    };
    PreviewBricksKeyboardHelper.prototype.itemHandleRightArrowKey = function (e, index) {
        var _this = this;
        return this._pageChangeHandle(function () {
            _this.setFocusToNext(index);
            return true;
        }, this._lastSelectedBrickIndex);
    };
    PreviewBricksKeyboardHelper.prototype.itemHandleEnterKey = function (e, index) {
        var _this = this;
        if (this.active) {
            if (this._lastSelectedBrickIndex !== this._firstSelectedBrickIndex)
                return false;
            var brick = this._bricks()[this._lastSelectedBrickIndex];
            if (brick && brick.active()) {
                this._actionExecute(brick, e);
            }
        }
        else if (this._usePageKeyboardNavigation() && this._currentPage !== this._pages()[index]) {
            this._goToPage(index);
            this._afterInitializeCallback = function () {
                _this._activatePage(e, index);
            };
        }
        else {
            this._activatePage(e, index);
        }
        return true;
    };
    PreviewBricksKeyboardHelper.prototype.itemHandleSpaceKey = function (e, index) {
        return this.itemHandleEnterKey(e, index);
    };
    PreviewBricksKeyboardHelper.prototype.setFocusToPrevious = function (currentIndex) {
        return _super.prototype.setFocusToPrevious.call(this, currentIndex);
    };
    PreviewBricksKeyboardHelper.prototype.setFocusToNext = function (currentIndex) {
        return _super.prototype.setFocusToNext.call(this, currentIndex);
    };
    PreviewBricksKeyboardHelper.prototype.createControlElement = function (element, index) {
        return new PreviewPageControlsElement(element, this);
    };
    return PreviewBricksKeyboardHelper;
}(analytics_internal_1.KeyboardHelperWithArrowButtonBase));
exports.PreviewBricksKeyboardHelper = PreviewBricksKeyboardHelper;
var PreviewPageControlsElement = (function (_super) {
    __extends(PreviewPageControlsElement, _super);
    function PreviewPageControlsElement(element, _keyboardHelper) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this._keyboardHelper = _keyboardHelper;
        _this._focusHandler = function () {
            _this._keyboardHelper.liveRegion().changeText(analytics_internal_1.getLocalization('Press Enter or Space to switch to the document reading mode.', 'ASPxReportsStringId.WebDocumentViewer_AriaSwitchToDocumentReadingMode'));
            _this.element.classList.remove('dx-accessibility-active-state');
            if (_this._keyboardHelper.active) {
                _this._keyboardHelper.reset();
            }
            _this._keyboardHelper.active = false;
        };
        element.addEventListener('focus', _this._focusHandler);
        return _this;
    }
    PreviewPageControlsElement.prototype.dispose = function () {
        this.element.removeEventListener('focus', this._focusHandler);
        _super.prototype.dispose.call(this);
    };
    return PreviewPageControlsElement;
}(analytics_internal_1.AccessibilityControlElementBase));
