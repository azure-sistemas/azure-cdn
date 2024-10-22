﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchResultNavigator.js)
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
var SearchResultNavigator = (function (_super) {
    __extends(SearchResultNavigator, _super);
    function SearchResultNavigator(searchModel, reportPreview) {
        var _this = _super.call(this) || this;
        _this.currentResult = ko.observable(null);
        var goToMatchedResult = function (foundResult) {
            if (!foundResult) {
                return;
            }
            reportPreview.goToPage && reportPreview.goToPage(foundResult.pageIndex);
            var page = reportPreview.pages.peek()[foundResult.pageIndex];
            page && page.selectBrick(foundResult.indexes);
        };
        _this.getFirstMatchFromPage = function (pageIndex, up, thisPageOnly) {
            if (!searchModel.searchResult() || searchModel.searchResult().length === 0) {
                return null;
            }
            var firstMatch;
            var sortOutResult = function (index) {
                searchModel.searchResult().forEach(function (m) {
                    if (thisPageOnly && m.pageIndex === index) {
                        if (!firstMatch || (m.id < firstMatch.id && !up || m.id > firstMatch.id && up)) {
                            firstMatch = m;
                        }
                    }
                    else {
                        if (m.pageIndex >= index && !up && (!firstMatch || m.id < firstMatch.id) || m.pageIndex <= index && up && (!firstMatch || m.id > firstMatch.id)) {
                            firstMatch = m;
                        }
                    }
                });
            };
            sortOutResult(pageIndex);
            !firstMatch && sortOutResult(up ? reportPreview.pages().length : 0);
            return firstMatch;
        };
        var _setCurrentResult = function (highlight, resultId, thisPageOnly) {
            if (searchModel.searchResult() && searchModel.searchResult().length !== 0) {
                var currentResult = (resultId >= 0 && searchModel.searchResult().length > resultId) ?
                    searchModel.searchResult()[resultId] :
                    _this.getFirstMatchFromPage(reportPreview.pageIndex.peek(), searchModel.searchUp.peek(), thisPageOnly);
                _this.currentResult(currentResult);
                highlight && goToMatchedResult(_this.currentResult.peek());
            }
            else {
                reportPreview.pages() && reportPreview.pages()[reportPreview.pageIndex()] && reportPreview.pages()[reportPreview.pageIndex()].selectBrick('');
            }
        };
        _this.goToResult = function (id) {
            if (id !== 0 && !id) {
                return null;
            }
            _setCurrentResult(true, id);
        };
        _this._disposables.push(reportPreview.pageIndex.subscribe(function (newPageIndex) {
            if (_this.currentResult() && newPageIndex === _this.currentResult().pageIndex)
                return;
            _this.currentResult(null);
        }));
        _this._disposables.push(searchModel.searchResult.subscribe(function () {
            _setCurrentResult(true);
        }));
        _this.next = function (up) {
            if (!searchModel.searchResult()) {
                return false;
            }
            if (!_this.currentResult()) {
                var prevPageIndex = (reportPreview.pageIndex() === 0 ? reportPreview.pages.length : reportPreview.pageIndex()) - 1;
                var pageIndexToSearchFrom = up ? prevPageIndex : reportPreview.pageIndex();
                var firstResult = _this.getFirstMatchFromPage(pageIndexToSearchFrom, up);
                _this.currentResult(firstResult);
                if (firstResult) {
                    goToMatchedResult(firstResult);
                    return true;
                }
                else {
                    return false;
                }
            }
            var id, currentId = _this.currentResult().id;
            if (up) {
                id = (currentId === 0) ? searchModel.searchResult().length - 1 : (currentId - 1);
            }
            else {
                id = (currentId === searchModel.searchResult().length - 1) ? 0 : (currentId + 1);
            }
            _this.currentResult(searchModel.searchResult()[id]);
            goToMatchedResult(_this.currentResult());
            return true;
        };
        return _this;
    }
    return SearchResultNavigator;
}(analytics_utils_1.Disposable));
exports.SearchResultNavigator = SearchResultNavigator;
