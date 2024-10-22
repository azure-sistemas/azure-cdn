﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_searchKeyboardHelper.js)
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
var SearchKeyboardHelper = (function (_super) {
    __extends(SearchKeyboardHelper, _super);
    function SearchKeyboardHelper(searchModel) {
        var _this = _super.call(this) || this;
        _this.liveRegionId = 'dxrd-preview-search-live-region';
        _this._disposables.push(searchModel.searchResult.subscribe(function (result) {
            if (result.length > 0)
                _this.liveRegion().changeText(analytics_internal_1.formatUnicorn(analytics_internal_1.getLocalization('{0} results are available', 'ASPxReportsStringId.WebDocumentViewer_AriaSearchResultsAvailable'), result.length));
            else if (!searchModel.loading() && !!searchModel.searchText())
                _this.liveRegion().changeText(searchModel.noResultText());
        }));
        _this._disposables.push(searchModel.searchText.subscribe(function (inputValue) {
            if (!!inputValue)
                _this.liveRegion().changeText(analytics_internal_1.formatUnicorn(analytics_internal_1.getLocalization('You searched for {0}', 'ASPxReportsStringId.WebDocumentViewer_AriaSearchString'), '"' + inputValue + '"'));
        }));
        return _this;
    }
    return SearchKeyboardHelper;
}(analytics_internal_1.ListKeyboardHelper));
exports.SearchKeyboardHelper = SearchKeyboardHelper;
