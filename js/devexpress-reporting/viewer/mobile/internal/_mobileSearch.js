﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileSearch.js)
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
var _searchViewModel_1 = require("../../search/_searchViewModel");
var settings_1 = require("../../settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var text_box_1 = require("devextreme/ui/text_box");
var ko = require("knockout");
var $ = require("jquery");
var MobileSearchViewModel = (function (_super) {
    __extends(MobileSearchViewModel, _super);
    function MobileSearchViewModel(reportPreview, gallery) {
        var _this = _super.call(this, reportPreview) || this;
        _this.height = ko.observable(0);
        _this['_resultNavigator']['_disposables'].forEach(function (x) { x.dispose(); });
        var _galleryCurrentItemBlocksSubscription;
        var currentBlocksSubscribe = function (selectedIndex) {
            _this._killSubscription(_galleryCurrentItemBlocksSubscription);
            _galleryCurrentItemBlocksSubscription = gallery.items()[selectedIndex].blocks.subscribe(function (newBlocks) { return _this.updatePagesInBlocks(newBlocks); });
            _this.updatePagesInBlocks(gallery.items()[selectedIndex].blocks());
        };
        var _gallerySelectedIndexSubscription;
        var currentIndexSubscribe = function () {
            _this._killSubscription(_gallerySelectedIndexSubscription);
            _gallerySelectedIndexSubscription = gallery.selectedIndex.subscribe(function (newSelectedIndex) { return currentBlocksSubscribe(newSelectedIndex); });
            currentBlocksSubscribe(gallery.selectedIndex());
        };
        _this._disposables.push(gallery.items.subscribe(function (newItems) { return currentIndexSubscribe(); }));
        currentIndexSubscribe();
        _this._disposables.push(_this.searchResult.subscribe(function (newResult) {
            if (!newResult || newResult.length === 0) {
                reportPreview.availablePages(null);
                reportPreview.pages().forEach(function (page) { return page.resetBrickRecusive(page.brick()); });
            }
            else {
                reportPreview.availablePages(newResult.map(function (x) { return x.pageIndex; }));
            }
            var blocks = gallery.items()[gallery.selectedIndex()].blocks();
            blocks.forEach(function (block) {
                block.page && block.page.resetBrickRecusive(block.page.brick());
                _this._updateBricks(block.page, _this.searchResult());
            });
        }));
        _this.searchPanelVisible = reportPreview.searchPanelVisible;
        _this.editorVisible = ko.observable(false);
        _this._disposables.push(_this.searchPanelVisible.subscribe(function (newVal) {
            if (!newVal || !settings_1.SearchAvailable()) {
                _this.stopSearching();
            }
            else {
                _this.height(MobileSearchViewModel.maxHeight);
            }
        }));
        _this.enabled = settings_1.SearchAvailable;
        return _this;
    }
    MobileSearchViewModel.prototype.focusEditor = function (event) {
        if (this.searchPanelVisible()) {
            this.editorVisible(true);
            var previewSearch = $('.dxrdp-search-editor');
            var searchEditor = text_box_1.default['getInstance'](previewSearch.get(0));
            searchEditor.focus();
            setTimeout(function () {
                event.currentTarget.blur();
                searchEditor.focus();
            }, 1);
        }
    };
    MobileSearchViewModel.prototype._killSubscription = function (subscription) {
        var index = this._disposables.indexOf(subscription);
        if (index == -1)
            return;
        subscription && subscription.dispose();
        this._disposables.splice(index, 1);
    };
    MobileSearchViewModel.prototype._updateBricks = function (page, searchResult) {
        var _this = this;
        if (page.brick() && searchResult && searchResult.length > 0) {
            var results = searchResult.filter(function (x) { return x.pageIndex === page.pageIndex; });
            for (var i = 0; i < results.length; i++) {
                page.selectBrick(results[i].indexes, true);
            }
        }
        else {
            var subscription = page.brick.subscribe(function (newVal) {
                subscription.dispose();
                _this._updateBricks(page, _this.searchResult());
            });
        }
    };
    MobileSearchViewModel.prototype.updatePagesInBlocks = function (blocks) {
        var _this = this;
        blocks.forEach(function (block) {
            if (block.page && _this.searchResult() && _this.searchResult().length > 0) {
                _this._updateBricks(block.page, _this.searchResult());
            }
        });
    };
    MobileSearchViewModel.prototype.stopSearching = function () {
        this.height(0);
        this.editorVisible(false);
        this.searchResult(null);
    };
    MobileSearchViewModel.prototype.startSearch = function () {
        if (this.searchResult() === null)
            this.findNext();
    };
    MobileSearchViewModel.maxHeight = 80;
    return MobileSearchViewModel;
}(_searchViewModel_1.SearchViewModel));
exports.MobileSearchViewModel = MobileSearchViewModel;
var SearchBarModel = (function (_super) {
    __extends(SearchBarModel, _super);
    function SearchBarModel(viewModel, element, $searchText) {
        var _this = _super.call(this) || this;
        _this.viewModel = viewModel;
        _this._disposables.push(viewModel.height.subscribe(function (newValue) {
            if (!newValue) {
                element.style.display = 'none';
            }
            else {
                element.style.display = 'block';
            }
            $searchText.css({
                'opacity': Math.min((newValue / MobileSearchViewModel.maxHeight), 1)
            });
        }));
        return _this;
    }
    SearchBarModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.viewModel.stopSearching();
    };
    return SearchBarModel;
}(analytics_utils_1.Disposable));
exports.SearchBarModel = SearchBarModel;
ko.bindingHandlers['dxrdSearchBar'] = {
    init: function (element, valueAccessor) {
        var viewModel = ko.unwrap(valueAccessor());
        var $element = $(element);
        element.style.display = 'none';
        var $searchText = $element.find('.dxrdp-taptosearch-text');
        var searchBarModel = new SearchBarModel(viewModel, element, $searchText);
        analytics_internal_1.addDisposeCallback(element, function () {
            searchBarModel.dispose();
        });
    }
};
