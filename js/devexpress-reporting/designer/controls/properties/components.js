﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\components.js)
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
var metadata_1 = require("../metadata/properties/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var ComponentsModel = (function (_super) {
    __extends(ComponentsModel, _super);
    function ComponentsModel(model, renameComponentStrategy) {
        var _this = _super.call(this) || this;
        _this.renameComponentStrategy = renameComponentStrategy;
        _this.className = function () {
            return 'component';
        };
        _this.controlType = 'XRComponent';
        var _name = ko.observable(model.name);
        _this.data = model.data;
        _this._disposables.push(_this.name = ko.pureComputed({
            read: function () { return _name(); },
            write: function (value) {
                if (value !== _name() && renameComponentStrategy.validateName(value) && renameComponentStrategy.validateUnique(value, _name())) {
                    if (renameComponentStrategy.tryRename(value, _this.data)) {
                        _name(value);
                    }
                }
            }
        }));
        return _this;
    }
    ComponentsModel.prototype.getInfo = function () {
        return [metadata_1.name];
    };
    return ComponentsModel;
}(analytics_utils_1.Disposable));
exports.ComponentsModel = ComponentsModel;
