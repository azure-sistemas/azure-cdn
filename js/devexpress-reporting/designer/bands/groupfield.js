﻿/**
* DevExpress HTML/JS Reporting (designer\bands\groupfield.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var GroupFieldModel = (function (_super) {
    __extends(GroupFieldModel, _super);
    function GroupFieldModel(model, serializer) {
        var _this = _super.call(this) || this;
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        _this.changeSortOrder = function () {
            var sortOrderValue = _this.sortOrder();
            if (sortOrderValue === 'Ascending') {
                _this.sortOrder('Descending');
            }
            else if (sortOrderValue === 'None') {
                _this.sortOrder('Ascending');
            }
            else {
                _this.sortOrder('None');
            }
        };
        _this._disposables.push(_this.sortOrderClass = ko.pureComputed(function () {
            var orderString = _this.sortOrder().toLowerCase();
            orderString = orderString === 'none' ? 'unsorted' : orderString;
            return { class: 'dxrd-image-' + orderString, template: 'dxrd-svg-operations-' + orderString };
        }));
        return _this;
    }
    GroupFieldModel.prototype.getInfo = function () {
        return groupfieldMetaData_1.groupFieldSerializationInfo;
    };
    GroupFieldModel.createNew = function () {
        return new GroupFieldModel({});
    };
    return GroupFieldModel;
}(analytics_utils_1.Disposable));
exports.GroupFieldModel = GroupFieldModel;
var groupfieldMetaData_1 = require("./metadata/groupfieldMetaData");
