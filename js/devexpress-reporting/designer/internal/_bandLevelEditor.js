﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_bandLevelEditor.js)
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
var queryBuilder_widgets_internal_1 = require("@devexpress/analytics-core/queryBuilder-widgets-internal");
var BandLevelEditor = (function (_super) {
    __extends(BandLevelEditor, _super);
    function BandLevelEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.min = 0;
        _this._disposables.push(_this.max = ko.pureComputed(function () {
            var model = _this._model();
            if (model && model.maxLevel)
                return model.maxLevel;
            return model && model.getModel && model.getModel() && model.getModel().maxLevel;
        }));
        return _this;
    }
    return BandLevelEditor;
}(queryBuilder_widgets_internal_1.UndoEditor));
exports.BandLevelEditor = BandLevelEditor;
