﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePreviewModel.js)
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
var ko = require("knockout");
var _previewModel_1 = require("../../internal/_previewModel");
var MobilePreviewModel = (function (_super) {
    __extends(MobilePreviewModel, _super);
    function MobilePreviewModel(options) {
        var _this = _super.call(this, options) || this;
        _this.slideOptions = options.slideOptions;
        _this.gallery = options.gallery;
        _this.paginator = options.paginator;
        _this.brickEventsDisabled = options.brickEventsDisabled;
        _this.availableFormats = options.availableFormats;
        _this._disposables.push(options.gallery);
        if (ko.isComputed(options.brickEventsDisabled))
            _this._disposables.push(options.brickEventsDisabled);
        if (options.slideOptions && ko.isComputed(options.slideOptions.scrollAvailable))
            _this._disposables.push(options.slideOptions.scrollAvailable);
        if (options.slideOptions && ko.isComputed(options.slideOptions.swipeEnabled))
            _this._disposables.push(options.slideOptions.swipeEnabled);
        _this._disposables.push(options.paginator);
        _this._disposables.push(options.searchModel);
        return _this;
    }
    return MobilePreviewModel;
}(_previewModel_1.PreviewDisposableModel));
exports.MobilePreviewModel = MobilePreviewModel;
