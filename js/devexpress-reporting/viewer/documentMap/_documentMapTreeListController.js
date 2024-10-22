﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapTreeListController.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var DocumentMapTreeListController = (function () {
    function DocumentMapTreeListController() {
        this.selectedItem = ko.observable(null);
        this.clickHandler = function (item) { return void 0; };
    }
    DocumentMapTreeListController.prototype.itemsFilter = function (item) {
        return true;
    };
    DocumentMapTreeListController.prototype.hasItems = function (item) {
        return item.isList === true;
    };
    DocumentMapTreeListController.prototype.canSelect = function (value) {
        return true;
    };
    DocumentMapTreeListController.prototype.select = function (value) {
        if (this.canSelect(value) && value !== this.selectedItem.peek()) {
            this.selectedItem.peek() && this.selectedItem.peek().isSelected(false);
            this.selectedItem(value);
            value.isSelected(true);
        }
    };
    DocumentMapTreeListController.prototype.showIconsForChildItems = function () {
        return false;
    };
    return DocumentMapTreeListController;
}());
exports.DocumentMapTreeListController = DocumentMapTreeListController;
