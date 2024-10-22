﻿/**
* DevExpress HTML/JS Reporting (designer\controls\_xrTodoControl.js)
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
var xrControl_1 = require("./xrControl");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var UnknownViewModel = (function (_super) {
    __extends(UnknownViewModel, _super);
    function UnknownViewModel(model, parent, serializer) {
        if (serializer === void 0) { serializer = new analytics_utils_1.ModelSerializer(); }
        var _this = _super.call(this, model, parent, serializer) || this;
        serializer._collectLinksAndEnumRefs(_this._model);
        return _this;
    }
    return UnknownViewModel;
}(xrControl_1.XRControlViewModel));
exports.UnknownViewModel = UnknownViewModel;
var TodoControlSurface = (function (_super) {
    __extends(TodoControlSurface, _super);
    function TodoControlSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this['controlTypeClass'] = 'dxrd-image-todo-' + control.controlType.slice(2).toLowerCase();
        _this['controlTypeIconTemplate'] = 'dxrd-svg-todo-' + control.controlType.slice(2).toLowerCase();
        _this.template = 'dxrd-todocontrol';
        return _this;
    }
    return TodoControlSurface;
}(xrControl_1.XRControlSurface));
exports.TodoControlSurface = TodoControlSurface;
