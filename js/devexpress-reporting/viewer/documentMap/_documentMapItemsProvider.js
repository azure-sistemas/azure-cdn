﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapItemsProvider.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var DocumentMapItemsProvider = (function () {
    function DocumentMapItemsProvider(bookmark) {
        var _this = this;
        this.bookmarkDict = {};
        this.getItems = function (pathRequest) {
            var result = $.Deferred();
            if (bookmark) {
                if (pathRequest.fullPath) {
                    var nodes = _this._selectNode(bookmark, pathRequest.fullPath);
                    result.resolve(nodes);
                }
                else {
                    var root = _this._getRootNode(bookmark);
                    result.resolve(root);
                }
            }
            else {
                result.reject();
            }
            return result.promise();
        };
    }
    DocumentMapItemsProvider.prototype._selectNode = function (root, path) {
        if (!!this.bookmarkDict[path]) {
            return this.bookmarkDict[path];
        }
        var pathComponents = path.split('.'), currentNode = root;
        if (pathComponents[0] !== '0') {
            return null;
        }
        for (var i = 1, index = pathComponents[i]; i < pathComponents.length; i++, index = pathComponents[i]) {
            if (currentNode && currentNode.nodes && currentNode.nodes[index]) {
                currentNode = currentNode.nodes[index];
            }
            else {
                return null;
            }
        }
        var result = DocumentMapItemsProvider.fillNode(currentNode);
        if (result && result.length !== 0) {
            this.bookmarkDict[path] = result;
        }
        return result;
    };
    DocumentMapItemsProvider.fillNode = function (bookmark) {
        if (!bookmark || !bookmark.nodes || bookmark.nodes.length <= 0) {
            return null;
        }
        return bookmark.nodes.map(function (node, i) { return { name: i + '', displayName: node.text, isList: node.nodes && node.nodes.length > 0, bookmark: node, specifics: 'node' }; });
    };
    DocumentMapItemsProvider.prototype._getRootNode = function (bookmark) {
        return [{ name: '0', displayName: bookmark.text, isList: bookmark.nodes && bookmark.nodes.length > 0, bookmark: bookmark, specifics: 'node' }];
    };
    return DocumentMapItemsProvider;
}());
exports.DocumentMapItemsProvider = DocumentMapItemsProvider;
