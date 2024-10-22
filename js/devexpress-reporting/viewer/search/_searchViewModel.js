﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchViewModel.js)
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
var _searchResultNavigator_1 = require("./_searchResultNavigator");
var constants_1 = require("../constants");
var settings_1 = require("../settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var data_source_1 = require("devextreme/data/data_source");
var _searchKeyboardHelper_1 = require("../accessibility/_searchKeyboardHelper");
var SearchViewModel = (function (_super) {
    __extends(SearchViewModel, _super);
    function SearchViewModel(reportPreview, enableKeyboardSupport) {
        var _this = _super.call(this) || this;
        _this._searchIgnoreObs = ko.observable(false);
        _this.itemClickAction = function (e) {
            _this.goToResult(e.data);
        };
        _this.actions = [];
        _this.focusRequested = ko.observable(true);
        _this.matchWholeWord = ko.observable(false);
        _this.matchCase = ko.observable(false);
        _this.searchUp = ko.observable(false);
        _this.searchText = ko.observable();
        _this.searchResult = ko.observable();
        _this.loading = ko.observable(false);
        _this._renderedSearchResult = ko.observable([]);
        _this.resetSearchResult();
        _this._resultNavigator = SearchViewModel.createResultNavigator(_this, reportPreview);
        _this.clean = function () { _this.searchText(''); };
        _this._disposables.push(reportPreview._currentDocumentId.subscribe(function (newVal) {
            _this.resetSearchResult();
        }));
        _this._disposables.push(reportPreview._currentReportId.subscribe(function (newVal) {
            _this.resetSearchResult();
        }));
        _this.findUp = function () { _this.searchUp(true); _this.findNext(); };
        _this.findDown = function () { _this.searchUp(false); _this.findNext(); };
        _this.goToResult = function (result) { _this._resultNavigator.goToResult(result.id); };
        var newSearch = function (text, matchCase, matchWholeWord) {
            _this._searchTimeout && clearTimeout(_this._searchTimeout);
            _this._searchTimeout = setTimeout(function () {
                _this._resultNavigator.currentResult(null);
                if (!text) {
                    reportPreview.pages() && reportPreview.pages()[reportPreview.pageIndex()] && reportPreview.pages()[reportPreview.pageIndex()].selectBrick('');
                    _this.searchResult([]);
                    return;
                }
                var mCase = _this.matchCase();
                text = mCase ? _this.searchText() : _this.searchText().toLocaleLowerCase();
                var cache = _this.matchWholeWord()
                    ? mCase ? _this._cachedWholeWordWithCaseRequests : _this._cachedWholeWordRequests
                    : mCase ? _this._cachedCaseSensitiveRequests : _this._cachedRequests;
                if (cache[text]) {
                    _this.loading(false);
                    _this.searchResult(cache[text]);
                    return;
                }
                _this.loading(true);
                _this._searchIgnoreObs(true);
                _this._searchIgnoreObs = ko.observable(false);
                var self = _this;
                (function (ignore) {
                    reportPreview.requestWrapper.findTextRequest(text, ignore).done(function (result) {
                        if (!ignore())
                            self.findTextRequestDone(result, cache[text]);
                    }).fail(function (error) {
                        if (!ignore()) {
                            self.searchResult([]);
                            self.loading(false);
                        }
                    });
                })(_this._searchIgnoreObs);
            }, 100);
        };
        _this.findNext = function () {
            if (_this.loading()) {
                return;
            }
            _this._resultNavigator.next(_this.searchUp()) || newSearch(_this.searchText(), _this.matchCase(), _this.matchWholeWord());
        };
        _this._disposables.push(_this.searchText.subscribe(function (newVal) { newSearch(newVal, _this.matchCase(), _this.matchWholeWord()); }), _this.matchCase.subscribe(function (newVal) { newSearch(_this.searchText(), newVal, _this.matchWholeWord()); }), _this.matchWholeWord.subscribe(function (newVal) { newSearch(_this.searchText(), _this.matchCase(), newVal); }));
        var disabled = ko.pureComputed(function () {
            var documentId = reportPreview['_currentDocumentId']();
            var pageIndex = reportPreview.pageIndex();
            return reportPreview.documentBuilding() || !documentId || pageIndex === -1;
        });
        var visible = ko.pureComputed(function () { return settings_1.SearchAvailable(); });
        _this._disposables.push(disabled, visible);
        _this.actions.push({
            id: constants_1.ActionId.Search,
            text: analytics_utils_1.getLocalization('Search', 'ASPxReportsStringId.SearchDialog_Header'),
            imageClassName: 'dxrd-image-search',
            imageTemplateName: 'dxrd-svg-preview-search',
            disabled: disabled,
            visible: visible,
            hasSeparator: true,
            hotKey: { ctrlKey: false, keyCode: 70 },
            clickAction: function () {
                if (!_this.tabInfo.active()) {
                    _this.tabInfo.active(true);
                }
                else {
                    _this.tabInfo.active.notifySubscribers(true);
                }
            }
        });
        _this.tabInfo = new analytics_utils_1.TabInfo({
            text: 'Search',
            template: 'dxrd-preview-search',
            model: _this,
            keyboardHelper: enableKeyboardSupport ? new _searchKeyboardHelper_1.SearchKeyboardHelper(_this) : undefined,
            localizationId: 'ASPxReportsStringId.SearchDialog_Header',
            imageClassName: 'search',
            imageTemplateName: 'dxrd-svg-preview-search',
            visible: ko.pureComputed(function () { return !disabled() && settings_1.SearchAvailable(); })
        });
        _this._disposables.push(_this.searchResult.subscribe(function (newVal) {
            if (newVal) {
                _this._renderedSearchResult(newVal.map(function (item) { return { data: item }; }));
            }
        }));
        _this._disposables.push(_this.tabInfo);
        var dataSource = null;
        _this._disposables.push(_this.searchResultDataSource = ko.pureComputed(function () {
            dataSource && dataSource.dispose();
            dataSource = new data_source_1.default({
                store: _this._renderedSearchResult(),
                paginate: _this._renderedSearchResult().length > 20,
                pageSize: 20
            });
            return dataSource;
        }));
        return _this;
    }
    SearchViewModel.prototype.resetSearchResult = function () {
        this._cachedRequests = {};
        this._cachedWholeWordRequests = {};
        this._cachedCaseSensitiveRequests = {};
        this._cachedWholeWordWithCaseRequests = {};
        this.searchResult([]);
        this.searchText('');
    };
    SearchViewModel.prototype.findTextRequestDone = function (result, cache) {
        this.loading(false);
        if (!result) {
            this.searchResult([]);
            return;
        }
        cache = (result.success ? result.matches : []) || [];
        this.searchResult(cache);
    };
    SearchViewModel.prototype.onItemRendered = function (e) {
        var _this = this;
        this._timeoutItemRendered && clearTimeout(this._timeoutItemRendered);
        this._timeoutItemRendered = setTimeout(function () {
            _this.tabInfo.keyboardHelper && _this.tabInfo.keyboardHelper.initialize();
        }, 100);
    };
    SearchViewModel.prototype.getActions = function (context) {
        return this.actions;
    };
    SearchViewModel.prototype.noResultText = function () {
        return analytics_internal_1.formatUnicorn(analytics_utils_1.getLocalization('No results found for {0}', 'ASPxReportsStringId.WebDocumentViewer_AriaSearchNoResults'), '"' + this.searchText() + '"');
    };
    Object.defineProperty(SearchViewModel.prototype, "disabled", {
        get: function () { return this.loading(); },
        enumerable: true,
        configurable: true
    });
    SearchViewModel.createResultNavigator = function (seacrhModel, reportPreview) {
        return new _searchResultNavigator_1.SearchResultNavigator(seacrhModel, reportPreview);
    };
    return SearchViewModel;
}(analytics_utils_1.Disposable));
exports.SearchViewModel = SearchViewModel;
