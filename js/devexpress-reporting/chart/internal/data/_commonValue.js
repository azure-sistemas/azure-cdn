﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_commonValue.js)
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
var _dataMemberBase_1 = require("./_dataMemberBase");
var _value_1 = require("../meta/_value");
var CommonValueDataMembers = (function (_super) {
    __extends(CommonValueDataMembers, _super);
    function CommonValueDataMembers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonValueDataMembers.from = function (value) {
        return new CommonValueDataMembers(value, null);
    };
    CommonValueDataMembers.toJson = function (value) {
        return value.toString() || {};
    };
    CommonValueDataMembers.prototype.getInfo = function () {
        return _value_1.commonValueSerializationsInfo;
    };
    Object.defineProperty(CommonValueDataMembers.prototype, "arrayValueDataMemberNames", {
        get: function () { return ['value']; },
        enumerable: true,
        configurable: true
    });
    return CommonValueDataMembers;
}(_dataMemberBase_1.DataMemberBase));
exports.CommonValueDataMembers = CommonValueDataMembers;
