﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_value1Value2.js)
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
var Value1Value2DataMembers = (function (_super) {
    __extends(Value1Value2DataMembers, _super);
    function Value1Value2DataMembers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Value1Value2DataMembers.prototype.getInfo = function () {
        return _value_1.value1Value2SerializationsInfo;
    };
    Object.defineProperty(Value1Value2DataMembers.prototype, "arrayValueDataMemberNames", {
        get: function () { return ['value1', 'value2']; },
        enumerable: true,
        configurable: true
    });
    return Value1Value2DataMembers;
}(_dataMemberBase_1.DataMemberBase));
exports.Value1Value2DataMembers = Value1Value2DataMembers;
