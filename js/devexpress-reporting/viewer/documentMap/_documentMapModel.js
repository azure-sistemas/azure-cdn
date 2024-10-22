﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapModel.js)
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
var _documentMapTreeListController_1 = require("./_documentMapTreeListController");
var _documentMapItemsProvider_1 = require("./_documentMapItemsProvider");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var DocumentMapModel = (function (_super) {
    __extends(DocumentMapModel, _super);
    function DocumentMapModel(reportPreview) {
        var _this = _super.call(this) || this;
        _this._selectedPath = ko.observable('0');
        _this._setSelectedPathByNavigationNode = function (nodes, brickNavigation, path) {
            if (path === void 0) { path = '0'; }
            nodes.forEach(function (item, index) {
                if (item.indexes === brickNavigation.indexes && item.pageIndex === brickNavigation.pageIndex) {
                    _this._selectedPath(path + '.' + index.toString());
                }
                else if (item.nodes) {
                    _this._selectedPath(_this._setSelectedPathByNavigationNode(item.nodes, brickNavigation, path + '.' + index.toString()));
                }
            });
            return _this._selectedPath();
        };
        var treeListController = new _documentMapTreeListController_1.DocumentMapTreeListController();
        _this.isEmpty = ko.pureComputed(function () {
            return !(reportPreview.documentMap() && reportPreview.documentMap().nodes && (reportPreview.documentMap().nodes.length !== 0));
        });
        treeListController.clickHandler = function (item) {
            var bookmark = item.data.bookmark;
            if (bookmark) {
                var pageIndex = bookmark.pageIndex < 0 ? 0 : bookmark.pageIndex;
                reportPreview.pages.peek()[pageIndex].selectBrick(bookmark.indexes);
            }
        };
        reportPreview.brickClickDocumentMapHandler = function (brickNavigation) {
            if (reportPreview.documentMap && reportPreview.documentMap())
                _this._setSelectedPathByNavigationNode(reportPreview.documentMap().nodes, brickNavigation);
        };
        _this._disposables.push({ dispose: function () { return delete reportPreview.brickClickDocumentMapHandler; } });
        var documentMapTabVisible = ko.pureComputed(function () { return !_this.isEmpty(); });
        _this.tabInfo = new analytics_utils_1.TabInfo({
            text: 'Document Map',
            template: 'dxrd-preview-document-map',
            model: _this,
            keyboardHelper: new analytics_internal_1.TreeListKeyboardHelper(),
            localizationId: 'DevExpress.XtraPrinting.PrintingSystemCommand.DocumentMap',
            imageClassName: 'reportexplorer',
            imageTemplateName: 'dxrd-svg-tabs-reportexplorer',
            visible: documentMapTabVisible
        });
        _this.documentMapOptions = ko.pureComputed(function () {
            return {
                itemsProvider: new _documentMapItemsProvider_1.DocumentMapItemsProvider(reportPreview.documentMap()),
                expandRootItems: true,
                selectedPath: _this._selectedPath,
                treeListController: treeListController,
                onItemsVisibilityChanged: function () { return _this.tabInfo.keyboardHelper && _this.tabInfo.keyboardHelper.initialize(); }
            };
        });
        _this._disposables.push(_this.tabInfo, documentMapTabVisible, _this.documentMapOptions, _this.isEmpty);
        return _this;
    }
    DocumentMapModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeProperties();
    };
    return DocumentMapModel;
}(analytics_utils_1.Disposable));
exports.DocumentMapModel = DocumentMapModel;
