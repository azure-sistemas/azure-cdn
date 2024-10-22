﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_collectionLookupEditor.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var CollectionLookupEditorModel = (function (_super) {
    __extends(CollectionLookupEditorModel, _super);
    function CollectionLookupEditorModel(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.array = ko.computed(function () { return _this.value() || []; });
        _this.selectedItem = ko.observable();
        _this._disposables.push(_this.array);
        return _this;
    }
    Object.defineProperty(CollectionLookupEditorModel.prototype, "editors", {
        get: function () {
            var selectedItem = this.selectedItem();
            return selectedItem && selectedItem['getInfo'] && selectedItem['getInfo']();
        },
        enumerable: true,
        configurable: true
    });
    return CollectionLookupEditorModel;
}(analytics_widgets_1.Editor));
exports.CollectionLookupEditorModel = CollectionLookupEditorModel;
