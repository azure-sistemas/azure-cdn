﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_loaddispatcher.js)
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
var _utils_1 = require("./_utils");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var RichEditLoadDispatcher = (function (_super) {
    __extends(RichEditLoadDispatcher, _super);
    function RichEditLoadDispatcher(richEdit) {
        var _this = _super.call(this) || this;
        _this.richEdit = richEdit;
        return _this;
    }
    RichEditLoadDispatcher.prototype.process = function (element) {
        if (element.queueAction === _utils_1.RichAction.OpenDocument) {
            this.richEdit.openDocumentNative(element.base64, element.documentFormat, function () {
                element.ready();
            }, function () {
                if (element.errorCallBack)
                    element.errorCallBack();
            });
        }
        if (element.queueAction == _utils_1.RichAction.NewDocument) {
            this.richEdit.newDocumentNative(function () {
                element.ready();
            });
        }
        if (element.queueAction == _utils_1.RichAction.SaveDocument) {
            this.richEdit.saveDocumentNative(element.documentFormat, function (result) {
                if (element.documentConverted)
                    element.documentConverted(result);
            });
        }
    };
    return RichEditLoadDispatcher;
}(analytics_utils_1.Disposable));
exports.RichEditLoadDispatcher = RichEditLoadDispatcher;
